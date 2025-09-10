import React, {useEffect, useState} from "react";

type ServicePhoto = {
    id?: number;
    path?: string;
    file?: File;
    url?: string;
    position?: number;
};

type Props = {
    photos: ServicePhoto[];
    setPhotos: (photos: ServicePhoto[]) => void;
    errors: Record<string, string>
};

export default function EditServicePhotosForm({ photos, setPhotos, errors }: Props) {
    const [visibleErrors, setVisibleErrors] = useState<Record<string,string> | null>(errors);

    useEffect(() => {
        setVisibleErrors(errors);
    }, [errors]);

    console.log(visibleErrors);

    const flushErrorsForAll = () => {
        setVisibleErrors(null);
    };

    const flushErrorForIndex = (index: number) => {
        if (!visibleErrors) return;
        const updated = { ...visibleErrors };
        delete updated[`photos.${index}`];
        setVisibleErrors(Object.keys(updated).length ? updated : null);
    };


    const addPhoto = (file: File) => {
        const newPhoto: ServicePhoto = {
            file,
            url: URL.createObjectURL(file),
            position: photos.length,
        };
        setPhotos([...photos, newPhoto]);
        flushErrorsForAll();
    };

    const removePhoto = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index)
            .map((p, i) => ({ ...p, position: i }));
        setPhotos(newPhotos);
        flushErrorsForAll();
    };

    const movePhoto = (index: number, direction: "left" | "right") => {
        const newPhotos = [...photos];
        const targetIndex = direction === "left" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= photos.length) return;

        [newPhotos[index], newPhotos[targetIndex]] = [newPhotos[targetIndex], newPhotos[index]];

        const reordered = newPhotos.map((p, i) => ({ ...p, position: i }));
        setPhotos(reordered);
        flushErrorsForAll();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            addPhoto(e.target.files[0]);
            e.target.value = "";
        }

        flushErrorsForAll();
    };

    return (
        <div className="flex flex-col border-t pt-4 mb-4 border-t-gray-100 w-full">
            <h3 className={`text-[13.5px] font-semibold ${photos.length > 0 ? 'mb-4' : 'mb-0'}`}>
                Photos du service
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div key={photo.id ?? `new-${index}`}>
                        <div className="relative w-full aspect-square border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                            {photo.url ? (
                                <img src={photo.url} alt={`Photo ${index + 1}`} className="object-cover w-full h-full" />
                            ) : photo.path ? (
                                <img src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`} className="object-cover w-full h-full" />
                            ) : (
                                <span className="text-xs text-gray-400">Aperçu</span>
                            )}

                            <div className="absolute top-2 right-2 flex gap-1">
                                <button
                                    type="button"
                                    className="text-gray-500 text-xs bg-white rounded px-2 py-1 shadow hover:bg-gray-50"
                                    onClick={() => movePhoto(index, "left")}
                                    disabled={index === 0}
                                >
                                    ←
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-500 text-xs bg-white rounded px-2 py-1 shadow hover:bg-gray-50"
                                    onClick={() => movePhoto(index, "right")}
                                    disabled={index === photos.length - 1}
                                >
                                    →
                                </button>
                                <button
                                    type="button"
                                    className="text-red-500 text-xs bg-white rounded px-2 py-1 shadow hover:bg-red-50"
                                    onClick={() => removePhoto(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {visibleErrors?.[`photos.${index}`] && (
                            <p className="mt-1 text-[11px] text-red-500">
                                {visibleErrors?.[`photos.${index}`]}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {visibleErrors?.photos && (
                <p className="mt-1 text-[11px] text-red-500">
                    {visibleErrors?.photos}
                </p>
            )}

            <label className="w-fit cursor-pointer text-[12px] mt-2 text-slate-700 font-medium hover:underline">
                + Ajouter une photo
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
