import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap";



function TableEdit({mymodal , currentProduct , URL , PATH , setTempProduct}){
  const [state , setState] = useState(false);
  const modalRef = useRef(null);
  const {title , category , content , description , imageUrl , id , is_enabled , origin_price , price , unit} = currentProduct
  const onSubmit = () => {
     setState(prestate => !prestate);
  }
  const {register , handleSubmit , formState: { isDirty , errors} ,reset , getValues ,setValue ,watch} = useForm({
    defaultValues:{
      imageUrl : imageUrl,
      title : title,
      category : category,
      content : content,
      description : description,
      is_enabled : +is_enabled,
      origin_price : origin_price,
      price : price,
      unit : unit
    }
  });


  // 初始化模態框
  useEffect(() => {
      mymodal.current = new Modal(modalRef.current);
  }, []);
    
  // 避免modal初始化影響值
  useEffect(() => {
    setValue('imageUrl', imageUrl);
    setValue('title', title);
    setValue('category', category);
    setValue('content', content);
    setValue('description', description);
    setValue('is_enabled', is_enabled);
    setValue('origin_price', origin_price);
    setValue('price', price);
    setValue('unit', unit);
  }, [currentProduct, setValue]);
  

  //submit後更新資料
  useEffect(()=>{
    const newValues = getValues();
    if(isDirty && Object.keys(errors).length === 0){
      axios.put(`${URL}/v2/api/${PATH}/admin/product/${id}` , {
        "data":  {...newValues,
          origin_price: +newValues.origin_price,
          price : +newValues.price
        }
      })
      .then(()=>{
        setTempProduct(prestate => !prestate)
        mymodal.current.hide();
      })
      .catch((err)=>{
        alert.log(`更新失敗`, err);
      })
    }
  },[state])

  //取消
  const cancle = useCallback(()=>{
          mymodal.current.hide();
          reset({
            imageUrl: imageUrl,
            title: title,
            category: category,
            content: content,
            description: description,
            is_enabled: +is_enabled,
            origin_price: origin_price,
            price: price,
            unit: unit
           });
  })

  return (
    <>
      <div ref={modalRef} className="modal fade" >
         <div className="modal-dialog modal-xl">
           <form onSubmit={handleSubmit(onSubmit)} className="modal-content border-0">
             <div className="modal-header bg-dark text-white">
               <h5 id="productModalLabel" className="modal-title">
                 <span>編輯產品</span>
               </h5>
               <button
                 type="button"
                 className="btn-close"
                 data-bs-dismiss="modal"
                 aria-label="Close"
                 ></button>
             </div>
             <div className="modal-body">
               <div className="row">
                 <div className="col-sm-4">
                   <div className="mb-2">
                     <div className="mb-3">
                       <label htmlFor="imageUrl" className="form-label">
                         輸入圖片網址
                       </label>
                       <input
                         {...register('imageUrl', {required :'尚未填寫'
                         })}
                         type="text"
                         className="form-control"
                         placeholder="請輸入圖片連結"
                         />
                     </div>
                     {errors.imageUrl && <span className="text-danger">{errors?.imageUrl?.message}</span>}
                      <img className="img-fluid" src={watch('imageUrl')} alt="主要圖片" />
                   </div>
                 </div>
                 <div className="col-sm-8">
                   <div className="mb-3">
                     <label htmlFor="title" className="form-label">標題</label>
                     <input
                       {...register('title' ,{required :'尚未填寫'
                       })}
                       id="title"
                       type="text"
                       className="form-control"
                       placeholder="請輸入標題"
                       />
                       {errors.title && <span className="text-start text-danger">{errors?.title?.message}</span>}
                   </div>
                   <div className="row">
                     <div className="mb-3 col-md-6">
                       <label htmlFor="category" className="form-label">分類</label>
                       <input
                         {...register('category' ,{required :'尚未填寫'
                         })}
                         id="category"
                         type="text"
                         className="form-control"
                         placeholder="請輸入分類"
                         />
                         {errors.category && <span className="text-start text-danger">{errors?.category?.message}</span>}
                     </div>
                     <div className="mb-3 col-md-6">
                       <label htmlFor="unit" className="form-label">單位</label>
                       <input
                         {...register('unit' ,{required :'尚未填寫'
                         })}
                         id="unit"
                         type="text"
                         className="form-control"
                         placeholder="請輸入單位"
                         />
                         {errors.unit && <span className="text-start text-danger">{errors?.unit?.message}</span>}
                     </div>
                   </div>
                   <div className="row">
                     <div className="mb-3 col-md-6">
                       <label htmlFor="origin_price" className="form-label">原價</label>
                       <input
                         {...register('origin_price' ,{required :'尚未填寫'
                         })}
                         id="origin_price"
                         type="number"
                         min="0"
                         className="form-control"
                         placeholder="請輸入原價"
                         />
                         {errors.origin_price && <span className="text-start text-danger">{errors?.origin_price?.message}</span>}
                     </div>
                     <div className="mb-3 col-md-6">
                       <label htmlFor="price" className="form-label">售價</label>
                       <input
                         {...register('price' ,{required :'尚未填寫'
                         })}
                         id="price"
                         type="number"
                         min="0"
                         className="form-control"
                         placeholder="請輸入售價"
                         />
                         {errors.price && <span className="text-start text-danger">{errors?.price?.message}</span>}
                     </div>
                   </div>
                   <hr />
                   <div className="mb-3">
                     <label htmlFor="description" className="form-label">產品描述</label>
                     <textarea
                       {...register('description' ,{required :'尚未填寫'
                       })}
                       id="description"
                       className="form-control"
                       placeholder="請輸入產品描述"
                       ></textarea>
                       {errors.description && <span className="text-start text-danger">{errors?.description?.message}</span>}
                   </div>
                   <div className="mb-3">
                     <label htmlFor="content" className="form-label">說明內容</label>
                     <textarea
                       {...register('content' ,{required :'尚未填寫'
                       })}
                       id="content"
                       className="form-control"
                       placeholder="請輸入說明內容"
                       ></textarea>
                       {errors.content && <span className="text-start text-danger">{errors?.content?.message}</span>}
                   </div>
                   <div className="mb-3">
                     <div className="form-check">
                       <input
                         {...register('is_enabled')}
                         id="is_enabled"
                         className="form-check-input"
                         type="checkbox"
                         />
                       <label className="form-check-label" htmlFor="is_enabled">
                         是否啟用
                       </label>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="modal-footer">
               <button
                 type="button"
                 onClick={cancle}
                 className="btn btn-outline-secondary"
                 >
                 取消
               </button>
               <button type="submit" className="btn btn-primary" onClick={()=>{handleSubmit(onSubmit)()}}>確認</button>
             </div>
           </form>
         </div>
         </div>
    </>
  )
}


function CreatTable({creatModal,URL, PATH ,setTempProduct}){
  const onSubmit = () => {
    postProductsData()
  }
 
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const {register , handleSubmit , formState: { errors },getValues ,watch,reset} = useForm();

  // 初始化模態框`
    useEffect(() => {
      creatModal.current = new Modal(modalRef.current);
  }, []);

  //新增Data
  const postProductsData = useCallback(()=>{
    const value = getValues();
    const {
      title,
      imageUrl,
      category,
      unit,
      origin_price,
      price,
      content,
      description,
      is_enabled,
    } = value;

    if(value){    
      setLoading(true)
      axios.post(`${URL}/v2/api/${PATH}/admin/product` , {
        "data": {
          "title": title,
          "category": category,
          "origin_price": +origin_price,
          "price": +price,
          "unit": unit,
          "description": description,
          "content": content,
          "is_enabled": is_enabled,
          "imageUrl": imageUrl
        }
      })
        .then(()=>{
          setTempProduct(prestate=>!prestate)
          creatModal.current.hide();
        })
        .catch(err =>{
          console.log(err)
        })
        .finally(()=>{
          setLoading(false)
        })
    }})  

    //取消
  const cancle = useCallback(()=>{
        reset();
        creatModal.current.hide();
  })

  return(
          <>  
          <div ref={modalRef} className="modal fade">
         <div className="modal-dialog modal-xl">
           <form onSubmit={handleSubmit(onSubmit)} className="modal-content border-0">
             <div className="modal-header bg-dark text-white">
               <h5 id="productModalLabel" className="modal-title">
                 <span>新增產品</span>
               </h5>
               <button
                 type="button"
                 className="btn-close"
                 data-bs-dismiss="modal"
                 aria-label="Close"
                 ></button>
             </div>
             <div className="modal-body">
               <div className="row">
                 <div className="col-sm-4">
                   <div className="mb-2">
                     <div className="mb-3">
                       <label htmlFor="imageUrl" className="form-label">
                         輸入圖片網址
                       </label>
                       <input
                         {...register('imageUrl' , {required:"尚未填寫"})}
                         type="text"
                         className="form-control"
                         placeholder="請輸入圖片連結"
                         />
                         {errors.imageUrl && <span className="text-danger">{errors?.imageUrl?.message}</span>}
                     </div>
                     <img className="img-fluid" src={watch('imageUrl')} alt="主要圖片" />
                   </div>
                 </div>
                 <div className="col-sm-8">
                   <div className="mb-3">
                     <label htmlFor="title" className="form-label">標題</label>
                     <input
                       {...register('title' , {required : "尚未填寫"})}
                       id="title"
                       type="text"
                       className="form-control"
                       placeholder="請輸入標題"
                       />
                       {errors.title && <span className="text-danger">{errors?.title?.message}</span>}
                   </div>
                   <div className="row">
                     <div className="mb-3 col-md-6">
                       <label htmlFor="category" className="form-label">分類</label>
                       <input
                         {...register('category' , {required :"尚未填寫"})}
                         id="category"
                         type="text"
                         className="form-control"
                         placeholder="請輸入分類"
                         />
                         {errors.category && <span className="text-danger">{errors?.category?.message}</span>}
                     </div>
                     <div className="mb-3 col-md-6">
                       <label htmlFor="unit" className="form-label">單位</label>
                       <input
                         {...register('unit' , {required : "尚未填寫"})}
                         id="unit"
                         type="text"
                         className="form-control"
                         placeholder="請輸入單位"
                         />
                         {errors.unit && <span className="text-danger">{errors?.unit?.message}</span>}
                     </div>
                   </div>
                   <div className="row">
                     <div className="mb-3 col-md-6">
                       <label htmlFor="origin_price" className="form-label">原價</label>
                       <input
                         {...register('origin_price' , {required : "尚未填寫"})}
                         id="origin_price"
                         type="number"
                         min="0"
                         className="form-control"
                         placeholder="請輸入原價"
                         />
                         {errors.origin_price && <span className="text-danger">{errors?.origin_price?.message}</span>}
                     </div>
                     <div className="mb-3 col-md-6">
                       <label htmlFor="price" className="form-label">售價</label>
                       <input
                         {...register('price' , {required:"尚未填寫"})}
                         id="price"
                         type="number"
                         min="0"
                         className="form-control"
                         placeholder="請輸入售價"
                         />
                         {errors.price && <span className="text-danger">{errors?.price?.message}</span>}
                     </div>
                   </div>
                   <hr />
                   <div className="mb-3">
                     <label htmlFor="description" className="form-label">產品描述</label>
                     <textarea
                       {...register('description' , {required:"尚未填寫"})}
                       id="description"
                       className="form-control"
                       placeholder="請輸入產品描述"
                       ></textarea>
                       {errors.description && <span className="text-danger">{errors?.description?.message}</span>}
                   </div>
                   <div className="mb-3">
                     <label htmlFor="content" className="form-label">說明內容</label>
                     <textarea
                       {...register('content' ,{required:"尚未填寫"})}
                       id="content"
                       className="form-control"
                       placeholder="請輸入說明內容"
                       ></textarea>
                       {errors.content && <span className="text-danger">{errors?.content?.message}</span>}
                   </div>
                   <div className="mb-3">
                     <div className="form-check">
                       <input
                         {...register('is_enabled')}
                         id="is_enabled"
                         className="form-check-input"
                         type="checkbox"
                         />    
                       <label className="form-check-label" htmlFor="is_enabled">
                         是否啟用
                       </label>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="modal-footer">
               <button
                 type="button"
                 className="btn btn-outline-secondary"
                 onClick={cancle}
                 >
                 取消
               </button>
               <button type="submit" className="btn btn-primary" disabled={loading} onClick={()=>{handleSubmit(onSubmit)()}}>確認</button>
             </div>
           </form>
         </div>
         </div>
          </>
  )
}

function Product({products ,mymodal ,setCurrentProduct ,URL ,PATH , setTempProduct}){

  //刪除Data
  const deleteData = useCallback((id)=>{
    axios.delete(`${URL}/v2/api/${PATH}/admin/product/${id}`)
      .then(res =>{
        setTempProduct(prestate=>!prestate)
      })
      .catch(err=>{
        alert(`刪除失敗` ,err)
      })
  },[])
  
  //編輯
  const edit = useCallback((product)=>{
     setCurrentProduct(product);
     mymodal.current.show();
  },[])


  return(
    <>
        <tbody>
            {products.map(product=>{
                const {id , title , category , origin_price , price , is_enabled } = product
                return (
                  <tr key={id}>
                  <td >{category}</td>
                  <td >{title}</td>
                  <td >{origin_price}</td>
                  <td >{price}</td>
                  <td >
                    {is_enabled == "1" ? <span className="text-success">啟用</span> : <span className="text-danger">未啟用</span>}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button type="button"  onClick={()=>{edit(product)}} className="btn btn-outline-primary btn-sm">
                        編輯
                      </button>
                      <button type="button" onClick={()=>{deleteData(id)}} className="btn btn-outline-danger btn-sm">
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
                )
              })}           
        </tbody>
    </>
  )
}

function IndexApp(){
    const URL = import.meta.env.VITE_BASE_URL,
          PATH= import.meta.env.VITE_API_PATH,
          [products, setProducts] = useState([]),
          [tempProduct, setTempProduct] = useState(false),
          [currentProduct , setCurrentProduct] = useState([]),
          creatModal = useRef(null),
          mymodal = useRef(null);
         
    //API取data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${URL}/v2/api/${PATH}/admin/products/all`);
          const products = res.data?.products;
          if (products) {
            const productsArray = Object.values(products);
            setProducts(productsArray);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchData();
    }, [tempProduct]);
    
    
    //驗證登入
     const check = useCallback(()=>{
       axios.post(`${URL}/v2/api/user/check`)
         .then((res)=>{
           alert(`驗證成功`)
         })
         .catch((err)=>{
           alert(`驗證失敗`)
         })
     },[])

    //新增產品
    const creat = useCallback(()=>{
      creatModal.current.show();
    },[])

    return (
        <>
        <div>
           <div className="container">
             <div className="text-end mt-4">
              <button className="btn  btn-primary me-2" onClick={check}>驗證登入</button>
              <button className="btn btn-primary" onClick={creat}>建立新的產品</button>
             </div>
             <table className="table mt-4">
               <thead>
                 <tr>
                   <th width="120">分類</th>
                   <th>產品名稱</th>
                   <th width="120">原價</th>
                   <th width="120">售價</th>
                   <th width="100">是否啟用</th>
                   <th width="120">編輯</th>
                 </tr>
               </thead>
               <Product products={products} mymodal={mymodal} setTempProduct={setTempProduct} setCurrentProduct={setCurrentProduct} URL={URL} PATH={PATH}/>
             </table>
           </div>
         </div>
         {/* 新增產品 */}
         <CreatTable creatModal={creatModal} URL={URL} PATH={PATH} setTempProduct={setTempProduct} />
         {/* 編輯產品 */}
          <TableEdit currentProduct={currentProduct} URL={URL} PATH={PATH} setTempProduct={setTempProduct} mymodal={mymodal}/>
        </>
    )
};


export default IndexApp;