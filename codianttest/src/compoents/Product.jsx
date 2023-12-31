// Product.js
import React, { useState } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetProductQuery, useDeleteProductMutation } from '../apis/productApi';
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';
import Modal from 'react-bootstrap/Modal';

function Product() {
  const { data, error, isLoading } = useGetProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (id) =>{setEditProductId(id);
      setShow(true);};

  const [editProductId, setEditProductId] = useState(null);

  if (error) {
    return <div>{error}</div>; // Show this when there's an error
  }

  //handle delete functionality
  const handleDelete = async (id) => {
    try {
      const result = await deleteProduct(id);
      if (result) {
        toast.success('Item deleted successfully!');
      }
    } catch ({ err }) {
      await toast.error(err?.data?.message || err.error);
    }
  };

  //edit functionality
  const handleEdit = (id) => {
    setEditProductId(id);
  };
console.log(data)
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((item) => (
          <div className="d-flex align-items-center justify-content-center" key={item._id}>
            <Card style={{ width: '50rem', marginTop: '4%' }}>
              <Card.Body>
                <Link to={`/products/${item._id}`}>
                  <Card.Title as="h5">{item.name}</Card.Title>
                </Link>
                <Card.Text>
                  Price:- {item.price} per product
                  <br />
                  Quantity:- {item.quantity}
                </Card.Text>
                <Carousel>
                  {item.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Card.Img
                        variant="top"
                        src={`http://localhost:5000/images/${image}`}
                        style={{width:"80%"}}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                

               
                  <>
                  <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
                <br />
                <br />
                  <Button variant="primary"  onClick={() => handleShow(item._id)}>
                  Edit
                </Button>
                  </>
                  
            
              </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <EditProduct productId={editProductId} handleClose={handleClose} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          </div>

          
        ))
      )}
    </>
  );
}

export default Product;
