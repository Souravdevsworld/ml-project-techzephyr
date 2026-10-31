"""Run the same synchronous frontend contract without starting Gradio."""
import argparse
import logging
from .generator import generate_3d, shutdown_worker


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('image')
    parser.add_argument('--prompt', default=None, help='Accepted but unused by image-only TripoSR.')
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO)
    try:
        print(generate_3d(args.image, args.prompt))
    finally:
        shutdown_worker()


if __name__ == '__main__':
    main()
