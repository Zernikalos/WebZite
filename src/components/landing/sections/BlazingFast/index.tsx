import CodeWindow from '@/components/CodeWindow';
import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';

const sampleCode = `val zernikalos = Zernikalos()

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
})`;

/**
 * Blazing Fast section showcasing code simplicity and performance.
 * Features a code window with a sample Kotlin snippet.
 */
export default function BlazingFastSection() {
  return (
    <section className="py-24 w-full">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row-reverse justify-between items-center gap-12">
        {/* Code Window */}
        <div className="w-full md:w-2/3 order-2 md:order-none">
          <CodeWindow language="kotlin" code={sampleCode} />
        </div>

        {/* Textual content */}
        <div className="w-full md:w-1/3 order-1 md:order-none">
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
