export default function UploadMedia({imageFile, setImageFile, setCoverImage, coverImage}){
    return (
        <div className="m-auto flex">
            <label className="flex flex-col justify-center mx-auto items-center border w-fit p-10 rounded-xl border-dashed border-[3px] border-theme-grey bg-theme-light-grey">
                {/* <span className="text-[12px]">Drag and Drop Video</span> */}
                {coverImage && <span className="text-theme-red text-[12px]">{coverImage.name}</span>}
                {/* {coverImage && <img src={coverImage.} alt="" /> */}
                {!coverImage && <><span className="text-[12px]">Click here to</span>
                <span className="text-theme-red text-[12px]">Add New File</span></>}
                <input type="file" accept="image/*" name="" id="" className="hidden" onChange={(e)=>{
                    let value = e.target.files;
                    value[0] && setCoverImage(value[0]);
                }}/>
            </label>
            <label className="ml-10 flex flex-col justify-center mx-auto items-center border w-fit p-10 rounded-xl border-dashed border-[3px] border-theme-grey bg-theme-light-grey">
                {/* <span className="text-[12px]">Drag and Drop Video</span> */}
                {imageFile && <span className="text-theme-red text-[12px]">{imageFile.name}</span>}
                {!imageFile && <><span className="text-[12px]">Click here to</span>
                <span className="text-theme-red text-[12px]">Add New File</span></>}
                <input type="file" accept="video/*" name="" id="" className="hidden" onChange={(e)=>{
                    let value = e.target.files;
                    value[0] && setImageFile(value[0]);
                }}/>
            </label>
        </div>
    )
}