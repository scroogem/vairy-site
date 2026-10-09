// Bulge mapping adapted from Shaders 4.0.4, Shader Effects Inc., MIT.
// https://github.com/shader-effects-inc/shaders · Shaders-LICENSE.txt
// This adapter caches one photograph texture and draws only on pointer updates.
export async function createOpticalLens(canvas, source, onFailure) {
  if (!navigator.gpu) return null;
  let device, texture, stopped = false;
  try {
    const adapter = await navigator.gpu.requestAdapter({powerPreference:'low-power'});
    if (!adapter) return null;
    device = await adapter.requestDevice();
    device.lost.then(() => {stopped=true;onFailure();});
    device.addEventListener('uncapturederror', () => {stopped=true;onFailure();});
    const context = canvas.getContext('webgpu');
    if (!context) {device.destroy();return null;}
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({device,format,alphaMode:'premultiplied'});
    const module = device.createShaderModule({code:`
      struct Optical { center:vec2f, size:vec2f, radius:f32, strength:f32, pad:vec2f };
      @group(0) @binding(0) var picture:texture_2d<f32>;
      @group(0) @binding(1) var pictureSampler:sampler;
      @group(0) @binding(2) var<uniform> lens:Optical;
      @vertex fn vertex(@builtin(vertex_index) i:u32) -> @builtin(position) vec4f {
        let p=array<vec2f,3>(vec2f(-1.,-1.),vec2f(3.,-1.),vec2f(-1.,3.));
        return vec4f(p[i],0.,1.);
      }
      @fragment fn fragment(@builtin(position) pixel:vec4f) -> @location(0) vec4f {
        let uv=pixel.xy/lens.size;
        let delta=(uv-lens.center)*lens.size;
        let distance=length(delta);
        let fade=1.-smoothstep(lens.radius-3.,lens.radius,distance);
        let falloff=(1.-smoothstep(lens.radius*.55,lens.radius,distance))*max(0.,1.-pow(distance/lens.radius,2.));
        let bulge=falloff*lens.strength;
        let sampleUV=lens.center+(uv-lens.center)*(1.-bulge);
        let split=delta/lens.size*0.016*bulge;
        let r=textureSample(picture,pictureSampler,sampleUV+split).r;
        let g=textureSample(picture,pictureSampler,sampleUV).g;
        let b=textureSample(picture,pictureSampler,sampleUV-split).b;
        let rim=smoothstep(lens.radius-8.,lens.radius-3.,distance)*fade*.14;
        return vec4f((vec3f(r,g,b)+vec3f(.4,.6,.8)*rim)*fade,fade);
      }`});
    const info = await module.getCompilationInfo();
    if (info.messages.some(message => message.type==='error')) {device.destroy();return null;}
    const pipeline = await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vertex'},fragment:{module,entryPoint:'fragment',targets:[{format}]},primitive:{topology:'triangle-list'}});
    const uniform = device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
    const sampler = device.createSampler({magFilter:'linear',minFilter:'linear',addressModeU:'clamp-to-edge',addressModeV:'clamp-to-edge'});
    let bindings;
    function resize() {
      texture?.destroy();
      canvas.width=source.width;canvas.height=source.height;
      texture=device.createTexture({size:[source.width,source.height],format:'rgba8unorm',usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});
      device.queue.copyExternalImageToTexture({source},{texture},[source.width,source.height]);
      bindings=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:texture.createView()},{binding:1,resource:sampler},{binding:2,resource:{buffer:uniform}}]});
    }
    resize();
    return {
      resize,
      draw(x,y,radius) {
        if (stopped) return;
        device.queue.writeBuffer(uniform,0,new Float32Array([x,y,canvas.width,canvas.height,radius,.62,0,0]));
        const encoder=device.createCommandEncoder();
        const pass=encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:'clear',storeOp:'store'}]});
        pass.setPipeline(pipeline);pass.setBindGroup(0,bindings);pass.draw(3);pass.end();
        device.queue.submit([encoder.finish()]);
      },
      destroy() {stopped=true;texture?.destroy();uniform.destroy();device.destroy();}
    };
  } catch {
    texture?.destroy();device?.destroy();return null;
  }
}
