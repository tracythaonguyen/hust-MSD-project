import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import Orders from './Components/Orders/Orders';
import AddNew from './Pages/AddNew/AddNew';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Blogs from './Pages/Blogs/Blogs';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import Lists from './Pages/UserLists/UserLists';
import './app.scss';

// Dynamicaly change the data for different pages(replaceable)
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        lable: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
    {
        id: 3,
        name: 'name',
        lable: 'Name',
        type: 'text',
        placeholder: 'John Smith',
        required: true,
        pattern: '^[A-Za-z]{1,20}$',
        errorMsg: 'Name is required!',
    },
    {
        id: 4,
        name: 'email',
        lable: 'Email',
        type: 'email',
        placeholder: 'example@email.com',
        required: true,
        errorMsg: 'Enter a valid email!',
    },
    {
        id: 5,
        name: 'password',
        lable: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
        pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
        errorMsg:
            'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
    },
    {
        id: 6,
        name: 'address',
        lable: 'Address',
        type: 'text',
        placeholder: 'Address',
        required: true,
        errorMsg: 'Address is required!',
    },
];
const productInpDetails = [
    {
        id: 2,
        name: 'video_title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Video title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 3,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Video description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 4,
        name: 'category_id',
        lable: 'Category',
        type: 'select',
        placeholder: 'Product category',
        required: true,
        errorMsg: 'Category is required!',
        options: [
            { id: 1, value: 1, name: 'Movies' },
            { id: 2, value: 2, name: 'News' },
            { id: 3, value: 3, name: 'Interview' },
            { id: 4, value: 4, name: 'Podcast' },
            { id: 5, value: 5, name: 'Vlog' },
            { id: 6, value: 6, name: 'Presentation' },
            { id: 7, value: 7, name: 'Talkshow' },
            { id: 8, value: 8, name: 'Animation' },
        ],
    },
    {
        id: 5,
        name: 'source_link',
        lable: 'Souce Link',
        type: 'text',
        placeholder: 'Source Link',
        required: true,
        errorMsg: 'Price is required!',
    },
    {
        id: 6,
        name: 'link_img',
        lable: 'Link Image',
        type: 'text',
        placeholder: 'Link Image',
        required: true,
        errorMsg: 'This field is required!',
    },
    //select input
    {
        id: 7,
        name: 'level',
        lable: 'Level',
        type: 'select',
        placeholder: 'Level',
        required: true,
        errorMsg: 'Status is required!',
        options: [
            { id: 1, value: 'Easy', name: 'Easy' },
            { id: 2, value: 'Medium', name: 'Medium' },
            { id: 3, value: 'Hard', name: 'Hard' },
        ],
    },
    {
        id: 8,
        name: 'tags',
        lable: 'Tags',
        type: 'text',
        placeholder: 'Travel, Communication',
        required: true,
        errorMsg: 'Tag is required!',
    },
];
const blogInputs = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'description',
        lable: 'Description',
        type: 'text',
        placeholder: 'Blog description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'tags',
        lable: 'Tags',
        type: 'text',
        placeholder: 'Travel, Communication',
        required: true,
        errorMsg: 'Tag is required!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        {/* nested routes */}
                        <Route path="users">
                            <Route index element={<Lists type="user" />} />
                            <Route path=":userId" element={<Detail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={userInpDetails}
                                        titlee="Add New User"
                                        type="USER"
                                    />
                                }
                            />
                        </Route>

                        <Route path="orders" element={<Orders />} />

                        {/* nested routes */}
                        <Route path="videos">
                            <Route index element={<Lists type="video" />} />
                            <Route path=":videoId" element={<Detail />} />
                                <Route
                                    path="addnew"
                                    element={
                                        <AddNew
                                            inputs={productInpDetails}
                                            titlee="Add New Video"
                                            type="VIDEO"
                                        />
                                    }
                                />
                        </Route>

                        <Route path="blogs">
                            <Route index element={<Blogs type="blog" />} />
                            <Route path=":blogId" element={<BlogDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew inputs={blogInputs} titlee="Add New Blog" type="BLOG" />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
