const ImagePreview = ({
  pendingImage,
  setPendingImage,
  setCaption,
  caption,
}: any) => {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div className="relative">
        <img
          src={pendingImage}
          className="w-16 h-16 object-cover rounded-lg border"
        />

        <button
          onClick={() => setPendingImage(null)}
          className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Add caption..."
        className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded-full outline-none"
      />
    </div>
  );
};

export default ImagePreview;
