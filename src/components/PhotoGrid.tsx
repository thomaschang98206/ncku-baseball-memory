const demoPhotos = [
  { id: 1, title: "Memory 01", category: "Chapter 0", image: "/images/main-visual.png" },
  { id: 2, title: "Memory 02", category: "Project 10", image: "/images/main-visual.png" },
  { id: 3, title: "Memory 03", category: "Chapter 1+", image: "/images/main-visual.png" },
];

export default function PhotoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#A8222B]">
            Photo Archive
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#421211] md:text-5xl">
            影像記憶牆
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#7A665B] md:text-base">
          這裡之後會接後台上傳的照片。目前先用主視覺作為 placeholder。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoPhotos.map((photo) => (
          <article
            key={photo.id}
            className="group overflow-hidden rounded-[2rem] border border-[#D8C7B2] bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#E8D8C7]">
              <img
                src={photo.image}
                alt={photo.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8222B]">
                {photo.category}
              </p>
              <h3 className="mt-2 text-xl font-black text-[#421211]">
                {photo.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
