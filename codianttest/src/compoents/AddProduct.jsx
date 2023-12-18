import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAddProductMutation } from '../apis/productApi';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';


function AddProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [file, setFile] = useState(null);

  //mutation and query variables
  const [addProduct] = useAddProductMutation();

  const navigate = useNavigate()

  //on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    //validation  
   if(name == undefined){
    toast.error("Please enter a name for the product.");
    return false;
   }
   if(price == undefined){
    toast.error("Please provide a price for the product.");
    return false;
   }
   
   if(file == undefined){
    toast.error("Please provide a image for the product.");
    return false;
   }

   //formdata 
    let formData = new FormData(); 
    formData.append('name',name);
    formData.append('price',price);
    formData.append('quantity',quantity);
    
    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
    }

    try {
       const result = await addProduct(formData).unwrap();
       if(result){
        toast.success("Product added successfully");
        navigate('/')
       }
    } catch (err) {
      await toast.error(err?.data?.message || err.error);
    }
  }


  return (
    <Form onSubmit={handleSubmit} encType='multipart/form-data' style={{ width: "30%", margin: "auto", backgroundColor: "white" , padding:"2em" ,marginTop:"1em"}}>
      <Form.Group className="mb-3" controlId="formBasicName" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice" >
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="price" onChange={e => setPrice(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="text" placeholder="quantity" onChange={e => setQuantity(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" onChange={e => setFile(e.target.files)} multiple />
      </Form.Group>

      <Button variant="primary" type="submit">
        ADD
      </Button>
    </Form>
  );
}

export default AddProduct;