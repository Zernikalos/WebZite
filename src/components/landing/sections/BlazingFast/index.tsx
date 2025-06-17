import CodeWindow from "../../../CodeWindow";

import SectionTitle from "../SectionTitle";
import SectionText from "../SectionText";

export default function BlazingFastSection() {
  return (
    <section className="tw:py-24 tw:w-full">
      <div className="container tw:flex tw:flex-col tw:md:flex-row-reverse tw:justify-between tw:items-center tw:gap-12">
        {/* Code Window */}
        <div className="tw:w-full tw:md:w-1/2 tw:order-2 tw:md:order-none">
          <CodeWindow
            language="kotlin"
            code={`val zernikalos = Zernikalos()

zernikalos.initialize(renderSurface, object : ZSceneStateHandler {
    override fun onReady(context: ZContext, done: ()->Unit) {
        // Create Scene and load resources
        context.scene = ZScene()
        context.scene?.addChild(zko.root as ZGroup)
        // Set camera
        context.activeCamera = findFirstCamera(context.scene!!) 
        done()
    }

    override fun onRender(ctx: ZContext, done: ()->Unit) {
        findFirstModel(ctx.scene)?.transform?.rotate(0.1f, 0f,1f, 0f)
        done()
    }
})`}
/>
        </div>

        {/* Textual content */}
        <div className="tw:w-full tw:md:w-1/2 tw:order-1 tw:md:order-none">
          <SectionTitle title="Blazing Fast" />
          <SectionText>
            Built with a unified core and minimal dependencies, Zernikalos delivers 
            lightning-fast development and runtime performance across all platforms.
            With just a few lines of code, you can have a powerful engine up and running.
          </SectionText>
        </div>
      </div>
    </section>
  );
}