import { createRoot } from "react-dom/client"
import { ShaderAnimation } from "@/components/ui/shader-animation"

// Gradio invokes this bundle with its HTML element as `element`.
declare const element: HTMLElement
const target = element.querySelector<HTMLElement>("[data-shader-root]")
if (target) {
  const root = createRoot(target)
  root.render(<ShaderAnimation />)
  const observer = new MutationObserver(() => {
    if (!element.isConnected) {
      root.unmount()
      observer.disconnect()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
