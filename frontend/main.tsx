import { useState } from "react"
import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import DataRain from "@/components/ui/data-rain"

// Gradio invokes this bundle with its HTML element as `element`.
declare const element: HTMLElement
const target = element.querySelector<HTMLElement>("[data-shader-root]")
const controls = element.querySelector<HTMLElement>("[data-atmosphere-controls]")

function HeroAtmosphere() {
  const [effect, setEffect] = useState<"rain" | "shader" | "off">("rain")
  return <>
    {effect === "rain" && <DataRain fullscreen={false} count={650} flowSpeed={0.8} obstacleRadius={40} />}
    {effect === "shader" && <ShaderAnimation />}
    {controls && createPortal(
      <div className="atmosphere-picker" role="group" aria-label="Hero animation">
        <span>Atmosphere</span>
        {(["rain", "shader", "off"] as const).map(value =>
          <button key={value} type="button" aria-pressed={effect === value}
            onClick={() => setEffect(value)}>
            {{ rain: "Data Rain", shader: "Shader", off: "Off" }[value]}
          </button>
        )}
      </div>, controls)}
  </>
}

if (target) {
  const root = createRoot(target)
  root.render(<HeroAtmosphere />)
  const observer = new MutationObserver(() => {
    if (!element.isConnected) {
      root.unmount()
      observer.disconnect()
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
