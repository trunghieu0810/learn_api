import React from 'react';
import { Container, Grid } from '@mui/material'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';

const Layout = dynamic(() =>
    import('../../component/Layout'),
    {
        loading: () => <LinearProgress></LinearProgress>
    }
);

function policy(props) {
    return (
        <Layout>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="stylesheet" href="..." />
                <title>Policy</title>
            </Head>
            <Container maxWidth='md'>
                <Grid container spacing={2}>
                    <Grid sm={12}>
                        <p style={{ fontWeight: '600', fontSize: '2rem', marginTop: '30px' }}>Chính sách đổi trả</p>
                    </Grid>
                    <Grid sm={12}>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>Thật khó chịu nếu phải làm công tác đổi/ trả cho đơn
                            hàng vừa mua!</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>Và cũng không mấy dễ chịu khi đọc những trang "Chính
                            sách đổi trả" dài
                            ngoằng và đủ thứ điều ràng buộc (thường là như thế).</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>- Khách hàng <span
                            style={{ fontSize: '1rem', fontWeight: '700' }}>được đổi hoặc
                            trả</span> sản phẩm <span style={{ fontSize: '1rem', fontWeight: '700' }}>trong vòng 60 ngày</span> kể
                            từ ngày nhận được sản phẩm.</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>- Bất kỳ sản phẩm nào đặt mua tại MORRI STORE (ngoại trừ
                            Outlet và sản phẩm
                            Pre-Order phiên bản số lượng giới hạn, không về thêm hàng) cũng được áp dụng chính sách này, kể cả
                            sản phẩm unbox. (Ai mà chịu được một quá quà lưu niềm mà bị hỏng ngay lần đầu tiên nhận chúng)</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>- Trường hợp đổi, <span
                            style={{ fontSize: '1rem', fontWeight: '700' }}>khách hàng
                            sẽ chịu chi phí vận chuyển chỉ với 15.000 VNĐ</span>, và MORRI STORE sẽ <span
                                style={{ fontSize: '1rem', fontWeight: '700' }}>giao lại hàng miễn phí</span> cho Khách hàng.</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>- Trường hợp trả,
                            <span style={{ fontSize: '1rem', fontWeight: '700' }}>MORRI STORE sẽ hoàn lại tiền hàng</span>
                            (không bao gồm tiền phí vận chuyển nếu có) cho khách
                            <span style={{ fontSize: '1rem', fontWeight: '700' }}>trong vòng 24h qua tài khoản của khách.</span>
                            . Sau đó, MORRI STORE sẽ
                            <span style={{ fontSize: '1rem', fontWeight: '700' }}>đến tận nơi lấy hàng trả và không thu thêm bất cứ phí
                                gì</span>
                            (Khách hàng cũng có thể tự gởi lại hàng cho MORRI STORE)
                        </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}><span style={{ fontSize: '1rem', fontWeight: '700' }}>3 Bước
                            nhanh chóng để đổi trả: </span></p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>
                            <span style={{ fontSize: '1rem', textAlign: 'justify' }}>Bước 1: </span>
                            Điền thông tin đổi hàng ở
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#ffba00', cursor: 'pointer', marginLeft:'5px' }}>đây</span>
                            , và trả hàng ở
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#ffba00', cursor: 'pointer', marginLeft:'5px' }}>đây</span>
                            , hoặc qua số hotline 0123456789.
                        </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>
                            <span style={{ fontSize: '1rem', textAlign: 'justify' }}>Bước 1: </span>
                            Nhận cuộc gọi xác nhận từ Coolmate về sản phẩm và thời gian nhận hàng.
                        </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>
                            <span style={{ fontSize: '1rem', textAlign: 'justify' }}>Bước 1: </span>
                            Ngay khi xác nhận chúng tôi sẽ gởi bạn đơn hàng mới (hoặc lấy đơn hàng về), bạn chỉ cần gởi hàng cần
                            đổi/trả cho shipper là được.
                        </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>
                            Xem thêm dịch vụ MORRI RETURN chỉ có tại MORRI STORE ở
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#ffba00', cursor: 'pointer', marginLeft:'5px' }}>đây</span>
                        </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}><span style={{ fontSize: '1rem', textAlign: 'justify' }}>Đối với
                            việc trả hàng:</span></p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}>Chúng tôi sẽ hoàn lại số tiền hàng (sau khi đã trừ
                            25.000 VNĐ phí ship hàng) vào tài khoản mà bạn xác nhận tối đa trong 24h làm việc (không tính thứ 7
                            và Chủ Nhật).</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}><span style={{ fontSize: '1rem', textAlign: 'justify' }}>Lưu ý:
                        </span></p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}> ⁃ MORRI STORE hỗ trợ đổi tối đa 3 lần/1 khách hàng.</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}> ⁃ MORRI STORE có quyền quyết định dừng việc hỗ trợ đổi
                            trả và trả lại tiền cho khách hàng nếu phát hiện khách hàng sử dụng chính sách để trục lợi (như việc
                            đổi quá nhiều lần).</p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}><span style={{ fontSize: '1rem', textAlign: 'justify' }}>Chúng
                            tôi làm gì với hàng đổi trả:</span></p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}> * Hư hỏng, lỗi sản phẩm: thu gom và gởi cho các chương
                            trình từ thiện </p>
                        <p style={{ fontSize: '1rem', textAlign: 'justify' }}> * Bít tất, boxer: huỷ bỏ 100% </p>
                    </Grid>
                </Grid>
            </Container>
        </Layout>

    );
}

export default policy;