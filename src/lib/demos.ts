export type DemoId = "fox" | "soldier" | "stormtrooper";

export interface DemoSpec {
  id: DemoId;
  group: string;
  title: string;
  description: string;
  /**
   * Path under the published `public/` folder (GitHub Pages friendly).
   * Demos are published to `public/demos/**`.
   */
  htmlPath: string;
}

export const DEMOS: DemoSpec[] = [
  {
    id: "fox",
    group: "Model visualizer",
    title: "Fox",
    description: "glTF (.glb) imported in Zernikalos Engine",
    htmlPath: "/demos/examples/fox.html",
  },
  {
    id: "soldier",
    group: "Model visualizer",
    title: "Soldier",
    description: "glTF (.glb) imported in Zernikalos Engine",
    htmlPath: "/demos/examples/soldier.html",
  },
  {
    id: "stormtrooper",
    group: "Model visualizer",
    title: "Stormtrooper",
    description: "Collada (.dae) imported in Zernikalos Engine",
    htmlPath: "/demos/examples/stormtrooper.html",
  },
];

export function getDemoById(id: string): DemoSpec | undefined {
  return DEMOS.find((d) => d.id === id);
}

