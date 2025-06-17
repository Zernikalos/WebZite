import CodeWindow from "../CodeWindow";

export default function BlazingFast() {
  
  return (
    <CodeWindow
      language="kotlin"
      code={`val zernikalos = Zernikalos()
      val renderSurface = findViewById<GLSurfaceView>(R.id.render_surface)
      
      zernikalos.initialize(renderSurface, object : ZSceneStateHandler {
          // ZSceneStateHandler implementation will be covered in the next section
      })
      `}
    />
  );
}