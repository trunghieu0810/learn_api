import { merge, now } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Container, Grid } from '@mui/material';
// import './UserChart.scss'
// ----------------------------------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

export default function UserChat({ users }) {
    console.log(users)
    const [genders, setGenders] = useState([0, 0, 0])
    const [old, setOld] = useState([0, 0, 0])


    useEffect(() => {
        let genderRender = [0,0,0]
        let oldRender = [0,0,0]
        let currentYear = new Date()
        users.forEach(value => {
            if(value.gender == 'male') {
                oldRender[0] += 1
            } else if (value.gender == 'female') {
                oldRender[1] += 1
            } else {
                oldRender[2] += 1
            }

            let currentBirthday = new Date(value.birthday)
            if (currentYear.getFullYear() - currentBirthday.getFullYear() < 18) {
                genderRender[0] += 1
            } else if (currentYear.getFullYear() - currentBirthday.getFullYear() >= 18 && currentYear.getFullYear() - currentBirthday.getFullYear() <= 25) {
                genderRender[1] += 1
            } else {
                genderRender[2] += 1
            }
        })
        console.log("Chạu lại usereffec")
        setGenders(genderRender)
        setOld(oldRender)
    }, [users])

    const chartOptions = {
        series: old,
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: ['Dưới 18', '18-25', 'Trên 25'],
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }

    }

    const chartOptionsGender = {
        series: genders,
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: ['Nam', 'Nữ', 'Khác'],
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }

    }


    return (
        <Container style={{ marginTop: '24px' }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Card className='border-1 border-solid border-black'>
                        <CardHeader style={{ fontWeight: '800' }} title="Độ tuổi người dùng" />
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <ReactApexChart type="donut" series={chartOptions.series} options={chartOptions.options} height={364} />
                        </Box>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card className='border-1 border-solid border-black'>
                        <CardHeader style={{ fontWeight: '800' }} title="Giới tính người dùng" />
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <ReactApexChart type="donut" series={chartOptionsGender.series} options={chartOptionsGender.options} height={364} />
                        </Box>
                    </Card>
                </Grid>

            </Grid>
        </Container>

    );
}
