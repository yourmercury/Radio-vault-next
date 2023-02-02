export default function UploadMedia({imageFile, setImageFile}){
    return (
        <div className="m-auto">
            <label className="flex flex-col justify-center mx-auto items-center border w-fit p-10 rounded-xl border-dashed border-[3px] border-theme-grey bg-theme-light-grey">
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