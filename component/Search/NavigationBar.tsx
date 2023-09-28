
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Divider, TextField } from '@mui/material'
import { FaFilter } from 'react-icons/fa'
import Checkbox from '@mui/material/Checkbox';
function NavigationBar(props) {

    const renderFromToMoney = () => {
        return (
            <div className='flex'>
                <span>Từ</span>
                <input className='w-12 mx-2 outline-none border-solid border-1 border-black rounded' type={'text'}></input>
                <span>Đến</span>
                <input className='w-12 mx-2 outline-none border-solid border-1 border-black rounded' type={'text'}></input>
            </div>
        )
    }

    return (
        <div>
            <div className='flex items-center font-bold mb-4'>
                <FaFilter className='mr-2 pr-1'></FaFilter>
                <div>BỘ LỌC TÌM KIẾM</div>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Loại sách</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider></Divider>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="0" control={<Checkbox />} label="Tiểu thuyết" />
                            <FormControlLabel value="1" control={<Checkbox />} label="Hài" />
                            <FormControlLabel value="2" control={<Checkbox />} label="Hâhaa" />
                            <FormControlLabel value="3" control={<Checkbox />} label="Huhu" />
                            <FormControlLabel value="4" control={<Checkbox />} label="Hello" />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Lượt mua</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider></Divider>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Trên 1000" />
                            <FormControlLabel value="male" control={<Radio />} label="500-1000" />
                            <FormControlLabel value="other" control={<Radio />} label="100-500" />
                            <FormControlLabel value="1" control={<Radio />} label="Dưới 100" />
                        </RadioGroup>
                    </FormControl>

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Giá bán</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider></Divider>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Trên 100.000" />
                            <FormControlLabel value="male" control={<Radio />} label="50.000-100.000" />
                            <FormControlLabel value="other" control={<Radio />} label="Dưới 50.000" />
                            <FormControlLabel value="1" control={<Radio />} label={renderFromToMoney()} />
                        </RadioGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default NavigationBar;