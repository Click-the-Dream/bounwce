import ActionButton from './components/ActionButton'
import { publishIcon, previewIcon, saveDraftIcon } from '../../assets'

const ProductActions = ({ isLoading, isPublishing, isSavingDraft}) => {
  const renderIcon = (src) => (props) => (
    <img src={src} alt='icon' width={15} />
  )
  
  return (
    <div className="bg-white rounded-[10px] p-5">
      <h1 className='text-black text-[14px] mb-2 font-semibold'>Publishing</h1>
      <p className='text-[#00000080] text-[12px] mb-7'>When you choose "Save & Publish", your product becomes visible to customers immediately. if you choose "Save as draft", it will remain in draft.</p>
      <hr className='border mb-4'/>
      <div className='flex sm:flex-col gap-2'>
        <div className='flex sm:flex-col gap-2'>
          <ActionButton 
            type={"submit"}
            value={"publish"}
            label={isPublishing ? "Publishing..." : "Save & Publish"}
            icon={renderIcon(publishIcon)}
            className={isPublishing ? "bg-black/35 text-white" : "bg-black text-white"}
            disabled={isLoading}
          />
          <ActionButton 
            type={"submit"}
            value={"draft"}
            label={isSavingDraft ? "Saving..." : "Save as Draft"}
            icon={renderIcon(saveDraftIcon)}
            disabled={isLoading}
          />
        </div>
        
        <div className='flex-1 mt-4'>
          <ActionButton 
            type={"button"}
            label={"Preview"}
            icon={renderIcon(previewIcon)}
            className={"border-none"}
          />
        </div>        
      </div>
    </div>
  )
}

export default ProductActions