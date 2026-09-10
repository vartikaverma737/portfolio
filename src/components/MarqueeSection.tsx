import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

function getDocumentOffsetTop(el: HTMLElement | null): number {
  let total = 0;
  let node: HTMLElement | null = el;
  while (node) {
    total += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return total;
}

interface MarqueeRowProps {
  images: string[];
  direction: 1 | -1;
}

function MarqueeRow({ images, direction }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = rowRef.current;
      if (!el) return;
      const sectionTop = getDocumentOffsetTop(el.parentElement);
      const nextOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(nextOffset);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const translateX = direction === 1 ? offset - 200 : -(offset - 200);

  return (
    <div ref={rowRef} className="w-full overflow-hidden">
      <div
        className="w-max flex gap-3 will-change-transform"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt=""
            loading="lazy"
            className="w-[420px] h-[270px] object-cover rounded-2xl shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

const triple = (arr: string[]) => [...arr, ...arr, ...arr];

export default function MarqueeSection() {
  const row1 = IMAGES.slice(0, 11);
  const row2 = IMAGES.slice(11);

  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3">
      <MarqueeRow images={triple(row1)} direction={1} />
      <MarqueeRow images={triple(row2)} direction={-1} />
    </section>
  );
}