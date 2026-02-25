import SectionTitle from '../SectionTitle';
import SectionText from '../SectionText';
import CodeWindow from '@/components/CodeWindow';

const sampleCode = `val zernikalos = Zernikalos()

zernikalos.initialize(renderSurface, object : ZSceneStateHandler {
    override fun onReady(context: ZContext, done: () -> Unit) {
        // Create Scene and load resources
        context.scene = ZScene()
        context.scene?.addChild(zko.root)
        // Set camera
        context.activeCamera = findFirstCamera(context.scene!!)
        done()
    }

    override fun onUpdate(ctx: ZContext, done: () -> Unit) {
        // Update logic per frame (rotation, etc.)
        findFirstModel(ctx.scene)?.transform?.rotate(0.1f, 0f, 1f, 0f)
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
      <div className="container mx-auto px-6 md:px-8 lg:px-12 flex flex-col md:flex-row-reverse justify-between items-stretch gap-8 lg:gap-10">
        {/* Code Window */}
        <div className="w-full md:w-2/3 order-2 md:order-none">
          <CodeWindow language="kotlin" code={sampleCode} />
        </div>

        {/* Textual content */}
        <div className="w-full md:w-1/3 order-1 md:order-none rounded-3xl border border-slate-200 bg-white/70 p-6 sm:p-8 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200/90">
            Developer Experience
          </p>
          <SectionTitle title="Blazing Fast" className="mt-3" />
          <SectionText>
            The goal is fast gameplay iteration: initialize a scene, attach assets, set a camera,
            and start updating frame logic without heavy setup. The snippet below shows the API
            shape and the kind of boilerplate you avoid.
          </SectionText>
        </div>
      </div>
    </section>
  );
}
