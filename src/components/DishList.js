import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DishList() {
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [dishes, setDishes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const getDishes = () => {
        axios.get('http://127.0.0.1:8000/api/dishes')
            .then(function (response) {
                console.log(response.data.data);
                setDishes(response.data.data)
                setIsLoaded(true)
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
            });
    }
    useEffect(() => {
        if (!isLoaded) getDishes();
    }, [isLoaded]);


    const handlerOnchange = (e) => {
        const val = e.target.value;
        setType(val);
        console.log(type);
    }
    const handlerPrice = (e) => {
        const val = e.target.value;
        setPrice(val);
        console.log(price);
    }
    const ricelist = dishes.filter((dishes) => type === "" ? true : dishes.name.toLowerCase().indexOf(type.toLowerCase()) !== -1).filter((dishes) => price === "" ? true : dishes.price == price).filter((dishes) => dishes.kind_id == 1)
    const breadlist = dishes.filter((dishes) => type === "" ? true : dishes.name.toLowerCase().indexOf(type.toLowerCase()) !== -1).filter((dishes) => price === "" ? true : dishes.price == price).filter((dishes) => dishes.kind_id == 2)
    const noodleslist = dishes.filter((dishes) => type === "" ? true : dishes.name.toLowerCase().indexOf(type.toLowerCase()) !== -1).filter((dishes) => price === "" ? true : dishes.price == price).filter((dishes) => dishes.kind_id == 3)
    return (
        <div className='container-fluit'>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="{{route('dishes.index')}}">Trang chủ</a>
                    </li>
                    <li><input type="text" className="form-control" value={type} placeholder="Nhập tên món" onChange={handlerOnchange} /></li>
                    <li><div className='d-flex justify-content-start'>
                        <p className='text-white'> Tìm kiến theo giá:</p>
                        <select name='price' onChange={handlerPrice}>
                            <option value=''>Không</option>
                            <option value='20000'>20000</option>
                            <option value='25000'>25000</option>
                            <option value='30000'>30000</option>
                        </select>
                    </div>
                    </li>


                </ul>
            </nav>
            <div className='container'>

                <h2>THỰC ĐƠN QUÁN CƠM HELLO</h2>
                <div>
                    <div><h2 className="text-center text-while">Có {ricelist.length} món cơm: </h2></div>
                    <div className="row">
                        {
                            ricelist
                                .map((dishes, index) =>
                                    <div className='col-3'>
                                        <img src={`http://localhost:8000/image/${dishes.image}`} style={{ width: '300px', height: '250px' }} className="img-thumbnail" alt=""></img>

                                        <div className='row'>
                                            <div className='col-8 text-dark'>{dishes.name}</div>
                                            <div className='col-4  text-right'>{dishes.price} .vnđ</div>
                                        </div>
                                        <br />
                                        <p className='text-dark'>{dishes.des}</p>


                                    </div>
                                )
                        }
                    </div>
                    <div><h2 className="text-center text-while">Có {breadlist.length} món bánh mì: </h2></div>
                    <div className="row">
                        {
                            breadlist
                                .map((dishes, index) =>
                                    <div className='col-6'>
                                        <div className="row">
                                            <div className="col-3"><img src={`http://localhost:8000/image/${dishes.image}`} className="img-thumbnail" alt="" /></div>
                                            <div className="col-9 text-while">
                                                <br />
                                                <div className="row">
                                                    <div className="col-8"><h5>{dishes.name}</h5></div>
                                                    <div className="col-4  text-right">{dishes.price} .vnđ</div>
                                                </div>
                                                <p>{dishes.des}</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                        }
                    </div>
                    <div><h2 className="text-center text-while">Có {noodleslist.length} món bún(phở): </h2></div>
                    <div className="row">
                        {
                            noodleslist
                                .map((dishes, index) =>
                                    <div className='col-4'>
                                        <div className="row">
                                            <div><img src={`http://localhost:8000/image/${dishes.image}`} style={{ width: '300px', height: '250px' }} className="img-thumbnail" alt="" /></div>

                                            <br />
                                            <div className="row">
                                                <div className="col-6"><h5>{dishes.name}</h5></div>
                                                <div className="col-6  text-right">{dishes.price} .vnđ</div>
                                            </div>
                                            <p>{dishes.des}</p>

                                        </div>

                                    </div>
                                )
                        }
                    </div>

                </div>
            </div>
        </div>

    )
}
export default DishList;
