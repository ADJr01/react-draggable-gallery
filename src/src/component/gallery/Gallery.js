import GalleryCss from './Gallery.module.css';
import Image from "../image/image";
import {useState} from "react";
function swapImages(array, image1, image2) {
    try {
        const index1 = array.indexOf(image1);
        const index2 = array.indexOf(image2);
        [array[index1], array[index2]] = [array[index2], array[index1]];
        return array;
    } catch (error) {
        console.error("One or both of the images not found in the array.");
        return [];
    }
}

const primaryList = [
    'image-1.webp',
    'image-2.webp',
    'image-3.webp',
    'image-4.webp',
    'image-5.webp',
    'image-6.webp',
    'image-7.webp',
    'image-8.webp',
    'image-9.webp',
    'image-10.jpeg',
    'image-11.jpeg',
];
const pre_fix = '/asset/images/'
export default function (props) {
    const [checkArray,setCheckArray] = useState([]);
    const [ImageList,setImageState] = useState(primaryList);
    const [dragSrc,setDragSrc] = useState('');
    const [dragDestination,setDragDestination] = useState('');

    const updateCheckArray = id=>{
        const index = checkArray.indexOf(id);
        if(index===-1){
            setCheckArray(prev=>{
                return [...prev,id];
            });
        }else{
            setCheckArray(prev=>{
                const new_arr = prev.filter(item=>item!==id);
                return new_arr;
            });
        }

    }
    const clearDragCalls = ()=>{
        setDragSrc('');
        setDragDestination('');
    }
    const onDragStart = (registerSrc)=>{
        setDragSrc((prev) => {
            return registerSrc;
        });
    }
    const onDragOver = (destination)=>{
        if(dragSrc===destination ) return;
        //console.log('swaping: ',dragSrc,destination);
        setDragDestination(destination);
        setImageState(prev=>{
            const new_arr =  swapImages(prev,dragSrc,destination)
            //console.log('updated list: ',new_arr);
            return new_arr;
        });
    }


    return (
        <div className={GalleryCss.app_container}>
            <div className={GalleryCss.app_title}>
                <span style={{fontWeight: checkArray.length>0?'normal':'bolder',fontSize:'24px'}}>{
                    checkArray.length===0?'Gallery':checkArray.length===1?`${checkArray.length} File Selected`:`${checkArray.length} Files Selected`
                }</span>
                {checkArray.length>0?<span style={{fontWeight: 'bold',fontSize:'18px',color:"red",padding:'0.35rem o.75rem',cursor: 'pointer'}} className={'hov_red_under_score'}>Delete Files</span>:''}
            </div>
            <div className={GalleryCss.gallery_view}>
                {ImageList.map((item,index)=>(
                    <Image key={item} showRadioBtn={checkArray.length>0}  onCheck={updateCheckArray} item_id={item} isDoppable={item===dragDestination} isDragging={item===dragSrc} item={`${pre_fix}${item}`} index={index} onDraginit={onDragStart} clearDrag={clearDragCalls} onDragEvent={onDragOver}/>
                ))}
                <div style={{border: '2px dotted black',borderRadius:'8px',display:'flex',flexDirection: 'column',justifyContent:'center',alignItems: 'center'}}>
                    <img src={'/asset/img-ico.png'} width={38} height={38} alt={'img ico'}/>
                    <span>Add Images</span>
                </div>
            </div>
        </div>
  );
}
