"""Create a local input sketch for the explicit paid CLI test; no API calls."""

from pathlib import Path

from PIL import Image, ImageDraw


def main() -> None:
    target = Path(__file__).resolve().parents[1] / "examples" / "chair.png"
    target.parent.mkdir(exist_ok=True)
    if target.exists():
        raise FileExistsError(f"Will not overwrite {target}")
    image = Image.new("RGB", (512, 512), "white")
    draw = ImageDraw.Draw(image)
    for line in (
        [(145, 245), (145, 90), (330, 105), (330, 250)],
        [(145, 245), (330, 250), (395, 310), (200, 310), (145, 245)],
        [(145, 245), (145, 380)], [(200, 310), (200, 440)],
        [(395, 310), (395, 425)], [(330, 250), (330, 385)],
    ):
        draw.line(line, fill="black", width=8, joint="curve")
    image.save(target)
    print(target)


if __name__ == "__main__":
    main()
