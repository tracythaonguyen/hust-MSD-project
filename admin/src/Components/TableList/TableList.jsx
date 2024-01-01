/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './tableList.scss';
// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function TableList() {
    // Replace this data with your own
    const [video, setVideo] = useState([]);
    //get video data from api
    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/video`
                );
                setVideo(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getVideo();
    }, []);
    console.log("vidoe", video);
    
    return (
        <TableContainer component={Paper} className="table_list">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">Video</TableCell>
                        <TableCell className="table_cell">Video Title</TableCell>
                        <TableCell className="table_cell">Category</TableCell>
                        <TableCell className="table_cell">Description</TableCell>
                        <TableCell className="table_cell">Level</TableCell>
                        <TableCell className="table_cell">Source Link</TableCell>
                        <TableCell className="table_cell">View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {video.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row" className="table_cell">
                                <div className="product_idd">
                                    <img src={row.link_img} alt="product" className="product_img" />
                                    {row._id}
                                </div>
                            </TableCell>
                            <TableCell className="table_cell">{row.video_title}</TableCell>
                            <TableCell className="table_cell">{row.category_id}</TableCell>
                            <TableCell className="table_cell">{row.description}</TableCell>
                            <TableCell className="table_cell">{row.level}</TableCell>
                            <TableCell className="table_cell">{row.source_link}</TableCell>
                            <TableCell className="table_cell">{row.view}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
