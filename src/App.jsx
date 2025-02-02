import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { saveVideoAPI, saveVideoEditAPI } from './services/allAPI';
import { getAllBooksAPI } from './services/allAPI';
import { deleteBookAPI } from './services/allAPI';
import './App.css'
import { Col, ModalBody, Row } from 'react-bootstrap';

function App() {

  useEffect(()=>{
    getAllBooks()
  },[])

  const [allBooks,setallBooks] = useState([])
  const [Edit,setEdit]=useState("")

  const[videoDetails,setvideoDetails]= useState({
    caption:"",imageUrl:""
  })

  const[videoDetailsEdit,setvideoDetailsEdit]= useState({
    caption:"",imageUrl:""
  })

  const getAllBooks = async () =>{
    try {
      
      const result = await getAllBooksAPI()
      
      if(result.status >= 200 && result.status < 300){
        setallBooks(result.data)
        
        
        
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const delete1 = async(id) =>{
      deleteBookAPI(id)
      getAllBooks()
  }

  const handleUploadVideo = async () =>{
    const {caption,imageUrl} = videoDetailsEdit
    
    
    
    if (caption && imageUrl ){
        // Store permanently
        try {
            const result = await saveVideoEditAPI(videoDetailsEdit) 
                if(result.status>=200 && result.status<300){
                    alert("Book Uploaded successfully !!")
                    handleCloseEdit()
                }
                else{
                    console.log(result);
                    
                }
            
            
        } catch (err) {
            console.log(err);
            
        }
       
    }
    else{
        alert("Please fill the form")
    }
    getAllBooks()
}

const handleUploadVideoEdit = async () =>{
  const {caption,imageUrl} = videoDetailsEdit
  
  
  
  if (caption && imageUrl ){
      // Store permanently
      try {
          const result = await saveVideoEditAPI(videoDetailsEdit,Edit) 
              if(result.status>=200 && result.status<300){
                  alert("Video Uploaded successfully !!")
                  handleCloseEdit()
              }
              else{
                  console.log(result);
                  
              }
          
          
      } catch (err) {
          console.log(err);
          
      }
     
  }
  else{
      alert("Please fill the form")
  }
  getAllBooks()
}

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);


  return (
    <>
    {/* Modal edit */}
    <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Book name</Modal.Title>
        </Modal.Header>
        <ModalBody>
        <input onChange={e=>setvideoDetailsEdit({...videoDetailsEdit,caption:e.target.value})} placeholder='Caption' className='m-2 w-75 p-2' type="text" /><br />
        <input onChange={e=>setvideoDetailsEdit({...videoDetailsEdit,imageUrl:e.target.value})} placeholder='Image URL' className='m-2 w-75 p-2' type="text" /><br />
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadVideoEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar expand="lg" className=" bg-info">
      <Container>
        <Navbar.Brand href="#home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    

    {/*Modal  */}
    <h3 style={{display:'inline'}} className='ms-2 ps-5 text-warning fw-bolder fs-1'>Upload new book</h3>
            <button onClick={handleShow} className='btn rounded-circle bg-warning ms-3 mb-2'><i class="fa-solid fa-plus"></i></button>
    <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Upload new book</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <input onChange={e=>setvideoDetails({...videoDetails,caption:e.target.value})} placeholder='Caption' className='m-2 w-75 p-2' type="text" /><br />
                <input onChange={e=>setvideoDetails({...videoDetails,imageUrl:e.target.value})} placeholder='Image URL' className='m-2 w-75 p-2' type="text" /><br />
                
                    
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleUploadVideo} variant="primary" >
                    Upload
                </Button>
                </Modal.Footer>
            </Modal>
        </div>


    {/* cards */}
    <h1>All Books</h1>
        <Row>
            {
              allBooks?.length>0?
              
              allBooks?.map(Book=>(
            <Col key={Book?.id} className='mb-3 ps-5 ms-5' sm={12} md={6} lg={6}>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Book.imageUrl} />

                <Card.Body>
                  <Card.Title>{Book.caption}</Card.Title>
                  
                  <div className='d-flex justify-content-between'>
                    <Button variant="primary">Go somewhere</Button>
                    <i class="fa-solid fa-trash" onClick={()=>delete1(Book.id)}></i>
                    <button onClick={() => { setEdit(Book.id); handleShowEdit(); }}>Edit</button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
              ))
              :
              <div className='text-danger fs-5'>NO Book uploaded</div>
            }
        </Row>
    </>
  )
}

export default App
