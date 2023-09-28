import { merge, now } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';
// material
import { Card, CardHeader, Box, Container, Grid, TextField } from '@mui/material';
//
import BaseOptionChart from './BaseOptionChart';

// ----------------------------------------------------------------------
import React, { useState, useMemo, useEffect } from 'react';
const SplitButtonYear = dynamic(() => import('./ButtonGroupYear'))
const SplitButtonMonth = dynamic(() => import('./ButtonGroupMonth'))

// [4,8,12,16,20,24,28]
export default function Traffic(props) {
    let a = new Date()
    const [typeDate, setTypeData] = React.useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    const [growth, setGrowth] = React.useState('(+100%) than Last Week')
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(a.getFullYear())
    const [tienGoc, setTienGoc] = React.useState([])
    const [tienDoanhThu, setTienDoanhThu] = React.useState([])
    const [tienLai, setTienLai] = React.useState([])
    var CHART_DATA = [
        {
            name: 'Tiền gốc',
            type: 'area',
            data: tienGoc
        },
        {
            name: 'Doanh thu',
            type: 'area',
            data: tienDoanhThu
        },
        {
            name: 'Tiền lãi',
            type: 'area',
            data: tienLai
        }
    ];

    useEffect(() => {
        setTypeData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        CalculateAnnualRevenue(props.dataDashboard.receipts, year)
        titleGrowthYear(props.dataDashboard.receipts, month, year)
    }, [props.dataDashboard.receipts])


    const chartOptions = merge(BaseOptionChart(), {
        stroke: { width: [1, 2, 3] },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: ['gradient', 'gradient', 'gradient'] },
        xaxis: {
            categories: typeDate,
        },
        yaxis: {
            decimalsInFloat: 2
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    return y.toLocaleString();
                }
            }
        }
    });

    const CalculateAnnualRevenue = (receipts, yearSelect) => {
        let arrTienGoc = []
        let arrTienLai = []
        let arrDoanhThu = []
        for (let i = 0; i < 12; i++) {
            let thangTienGoc = 0;
            let thangTienLai = 0;
            let thangDoanhThu = 0;
            receipts?.map((receipt) => {
                let timeCreate = new Date(receipt.createdAt)
                if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getMonth() == i && timeCreate.getFullYear() == yearSelect) {
                    thangDoanhThu += receipt.total
                    thangTienGoc += receipt.listProduct.reduce((total, product) => {
                        return total += product.quantity * product.product.historyPrice[0]
                    }, 0)
                    thangTienLai = thangDoanhThu - thangTienGoc
                }
            })
            arrTienGoc.push(thangTienGoc)
            arrTienLai.push(thangTienLai)
            arrDoanhThu.push(thangDoanhThu)
        }
        setTienGoc(arrTienGoc)
        setTienLai(arrTienLai)
        setTienDoanhThu(arrDoanhThu)
    }

    const CalculateMonthRevenue = (receipts, selectYear, selectMonth) => {
        let arrTienGoc = []
        let arrTienLai = []
        let arrDoanhThu = []

        if (new Date(selectYear, selectMonth, 0).getDate() > 28) {
            setTypeData(['Day 4', 'Day 8', 'Day 12', 'Day 16', 'Day 20', 'Day 24', 'Day 28', `Day ${new Date(selectYear, selectMonth, 0).getDate()}`])
        } else {
            setTypeData(['Day 4', 'Day 8', 'Day 12', 'Day 16', 'Day 20', 'Day 24', 'Day 28'])
        }

        for (let i = 0; i < 7; i++) {
            let thangTienGoc = 0;
            let thangTienLai = 0;
            let thangDoanhThu = 0;
            receipts?.map((receipt) => {
                let timeCreate = new Date(receipt.createdAt)
                if (timeCreate.getMonth() == (selectMonth - 1) && timeCreate.getFullYear() == selectYear) {
                    if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getDate() >= 4 * i && timeCreate.getDate() < 4 * (i + 1)) {
                        thangDoanhThu += receipt.total
                        thangTienGoc += receipt.listProduct.reduce((total, product) => {
                            return total += product.quantity * product.product.historyPrice[0]
                        }, 0)
                        thangTienLai =  thangDoanhThu - thangTienGoc
                    }

                }
            })
            arrTienGoc.push(thangTienGoc)
            arrTienLai.push(thangTienLai)
            arrDoanhThu.push(thangDoanhThu)
        }

        if (new Date(selectYear, selectMonth, 0).getDate() > 28) {
            let thangTienGoc = 0;
            let thangTienLai = 0;
            let thangDoanhThu = 0;
            for (let i = 29; i <= new Date(selectYear, selectMonth, 0).getDate(); i++) {
                receipts?.map((receipt) => {
                    let timeCreate = new Date(receipt.createdAt)
                    if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getMonth() == (selectMonth - 1) && timeCreate.getFullYear() == selectYear && timeCreate.getDate() == i) {
                        thangDoanhThu += receipt.total
                        thangTienGoc += receipt.listProduct.reduce((total, product) => {
                            return total += product.quantity * product.product.historyPrice[0]
                        }, 0)
                        thangTienLai = thangDoanhThu - thangTienGoc
                    }
                })
            }
            arrTienGoc.push(thangTienGoc)
            arrTienLai.push(thangTienLai)
            arrDoanhThu.push(thangDoanhThu)
        }
        setTienGoc(arrTienGoc)
        setTienLai(arrTienLai)
        setTienDoanhThu(arrDoanhThu)
    }

    const titleGrowthMonth = (receipts, selectMonth, selectYear) => {
        let currentDoanhThu = 0
        let lastDoanhThu = 0

        receipts?.map((receipt) => {
            let timeCreate = new Date(receipt.createdAt)
            if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getMonth() == (selectMonth - 1) && timeCreate.getFullYear() == selectYear) {
                currentDoanhThu += receipt.total
            }
        })

        if (selectMonth == 1) {
            receipts?.map((receipt) => {
                let timeCreate = new Date(receipt.createdAt)
                if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getMonth() == 11 && timeCreate.getFullYear() == (selectYear - 1)) {
                    lastDoanhThu += receipt.total
                }
            })
        } else {
            receipts?.map((receipt) => {
                let timeCreate = new Date(receipt.createdAt)
                if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getMonth() == (selectMonth - 2) && timeCreate.getFullYear() == selectYear) {
                    lastDoanhThu += receipt.total
                }
            })
        }

        if (currentDoanhThu == lastDoanhThu) {
            setGrowth('(+0%) than Last Month')
        } else if (lastDoanhThu == 0) {
            setGrowth('(+100%) than Last Month')
        } else if (currentDoanhThu == 9) {
            setGrowth('(-100%) than Last Month')
        } else {
            let growthPercent: Number = (currentDoanhThu / lastDoanhThu) * 100
            if (growthPercent < 100) {
                setGrowth(`(-${(100 - Number(growthPercent)).toFixed(2)}%) than Last Month`)
            } else {
                setGrowth(`(+${growthPercent.toFixed(2)}%) than Last Year`)
            }
        }
    }

    const titleGrowthYear = (receipts, selectMonth, selectYear) => {
        let currentDoanhThu = 0
        let lastDoanhThu = 0
        receipts?.map((receipt) => {
            let timeCreate = new Date(receipt.createdAt)
            if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getFullYear() == selectYear) {
                currentDoanhThu += receipt.total
            }
        })

        receipts?.map((receipt) => {
            let timeCreate = new Date(receipt.createdAt)
            if (receipt.deliveryStatus == 'Đã giao' && timeCreate.getFullYear() == (selectYear - 1)) {
                lastDoanhThu += receipt.total
            }
        })

        if (currentDoanhThu == lastDoanhThu) {
            setGrowth('(+0%) than Last Year')
        } else if (lastDoanhThu == 0) {
            setGrowth('(+100%) than Last Year')
        } else if (currentDoanhThu == 9) {
            setGrowth('(-100%) than Last Year')
        } else {
            let growthPercent: Number = (currentDoanhThu / lastDoanhThu) * 100
            if (growthPercent < 100) {
                setGrowth(`(-${(100 - Number(growthPercent)).toFixed(2)}%) than Last Year`)
            } else {
                setGrowth(`(+${growthPercent.toFixed(2)}%) than Last Year`)
            }
        }

    }

    useMemo(() => {
        if (month == 0) {
            setTypeData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
            CalculateAnnualRevenue(props.dataDashboard.receipts, year)
            titleGrowthYear(props.dataDashboard.receipts, month, year)
        } else {
            CalculateMonthRevenue(props.dataDashboard.receipts, year, month)
            titleGrowthMonth(props.dataDashboard.receipts, month, year)
        }
    }, [month, year])

    return (
        <Container style={{ marginTop: '24px' }}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Card style={{}} className='overflow-visible border-1 border-solid border-black '>
                        <CardHeader style={{ fontWeight: '800' }} title="Doanh thu" subheader={growth} />
                        <div className='flex justify-end mr-5'>
                            <div className='mr-4'>
                                <SplitButtonYear setYear={setYear}></SplitButtonYear>
                            </div>
                            <SplitButtonMonth setMonth={setMonth}></SplitButtonMonth>
                        </div>
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
