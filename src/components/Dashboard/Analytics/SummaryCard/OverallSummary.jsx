import React from "react";
import { Grid2, Paper, Typography } from "@mui/material";

const SummaryCard = ({ title, value, unit, svg }) => (
    <div style={{ padding: "1.5rem 1.6rem", borderRadius: '8px', border: '1px solid rgba(217, 217, 217, 0.40)', position: 'relative', height: '7.5rem' }}>
        <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Inter', fontWeight: '500' }}>{title}</Typography>
        <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Inter', fontWeight: '500', marginTop: '0.4rem' }}>
            {value} {unit}
        </Typography>
        <span style={{ position: 'absolute', bottom: '-0.4rem', right: '0', padding: 0 }}>{svg}</span>
    </div>
);

const OverallSummary = ({ data }) => (
    <div style={{
        display: "flex",
        width: '100%',
        justifyContent: 'space-between'
    }}>
        <Grid2 item sx={{ width: "24.2%" }}>
            <SummaryCard title="Avg Intensity by Floor Area" value={data.floorAreaIntensity} unit="Sq m" svg={<svg xmlns="http://www.w3.org/2000/svg" width="90" height="74" viewBox="0 0 101 83" fill="none">
                <path opacity="0.1" d="M29.2388 86.3816H21.4216V74.051C21.4216 73.8291 21.335 73.6164 21.1808 73.4595C21.0266 73.3026 20.8176 73.2145 20.5996 73.2145H10.7601C10.5374 73.2141 10.3229 73.3006 10.1608 73.4562C9.99877 73.6118 9.90143 73.8246 9.88882 74.051V86.3816H8.49963V88.9665H92.5086V86.3816H91.1194V74.051C91.1068 73.8246 91.0095 73.6118 90.8474 73.4562C90.6853 73.3006 90.4709 73.2141 90.2481 73.2145H80.4498C80.3384 73.2088 80.2271 73.2262 80.1226 73.2657C80.018 73.3052 79.9225 73.3659 79.8418 73.4442C79.761 73.5224 79.6968 73.6166 79.6529 73.7209C79.6091 73.8252 79.5865 73.9375 79.5867 74.051V86.3816H61.1902V68.9481C61.1913 68.7904 61.1614 68.634 61.1021 68.4883C61.0428 68.3425 60.9554 68.2104 60.845 68.0996C60.7346 67.9888 60.6036 67.9017 60.4595 67.8434C60.3155 67.7851 60.1615 67.7569 60.0065 67.7602H40.8949C40.5875 67.7602 40.2927 67.8845 40.0753 68.1057C39.8579 68.3269 39.7358 68.6269 39.7358 68.9397V86.3733H26.7071V27.4975H2.46611V86.3816H8.54073V88.9665H1.15913C0.851733 88.9665 0.556929 88.8423 0.33957 88.6211C0.12221 88.3999 9.82576e-05 88.0998 9.82576e-05 87.787V26.7697C-0.00234671 26.5421 0.040861 26.3164 0.127078 26.1064C0.213295 25.8964 0.340708 25.7065 0.501522 25.5483C0.65668 25.3872 0.842254 25.2597 1.04708 25.1734C1.25191 25.0872 1.47177 25.044 1.69343 25.0464H26.7071V1.88256C26.7521 1.40131 26.9615 0.951356 27.2989 0.611019C27.4906 0.412992 27.72 0.256734 27.9729 0.15175C28.2259 0.0467668 28.4972 -0.00474681 28.7703 0.000343626H72.1968C72.4627 -0.00162556 72.7262 0.0506608 72.9719 0.154113C73.2176 0.257564 73.4404 0.410083 73.6271 0.602654L73.7175 0.703039C74.049 1.07733 74.2334 1.56275 74.2354 2.0666V25.0297H99.3066C99.5282 25.0272 99.7481 25.0704 99.9529 25.1567C100.158 25.243 100.343 25.3705 100.498 25.5316C100.659 25.6898 100.787 25.8797 100.873 26.0897C100.959 26.2997 101.002 26.5254 101 26.7529V87.8205C101 88.1333 100.878 88.4333 100.66 88.6545C100.443 88.8757 100.148 89 99.8409 89H92.5004V86.4151H98.575V27.4975H74.2272V86.3816H71.6872V2.57689H29.2388V86.3816ZM13.5056 32.6255H7.24197C7.19265 32.6255 7.14332 32.6924 7.14332 32.776V36.9086C7.14332 36.9922 7.19265 37.0675 7.24197 37.0675H13.5056C13.555 37.0675 13.6043 37.0006 13.6043 36.9086V32.7342C13.6043 32.6506 13.555 32.5836 13.5056 32.5836V32.6255ZM13.5056 61.2937H7.24197C7.19265 61.2937 7.14332 61.369 7.14332 61.4443V65.5768C7.14332 65.6521 7.19265 65.7358 7.24197 65.7358H13.5056C13.555 65.7358 13.6043 65.6605 13.6043 65.5768V61.4025C13.6043 61.3272 13.555 61.2519 13.5056 61.2519V61.2937ZM24.0766 61.2937H17.813C17.7554 61.2937 17.7143 61.369 17.7143 61.4443V65.5768C17.7143 65.6521 17.7554 65.7358 17.813 65.7358H24.0766C24.126 65.7358 24.1671 65.6605 24.1671 65.5768V61.4025C24.1671 61.3272 24.1671 61.2519 24.0766 61.2519V61.2937ZM13.5056 51.6902H7.24197C7.19265 51.6902 7.14332 51.7655 7.14332 51.8492V55.9817C7.14332 56.0654 7.19265 56.1406 7.24197 56.1406H13.5056C13.555 56.1406 13.6043 56.0737 13.6043 55.9817V51.8659C13.6043 51.7739 13.555 51.707 13.5056 51.707V51.6902ZM13.5056 42.1369H7.24197C7.19265 42.1369 7.14332 42.2039 7.14332 42.2959V46.4284C7.14332 46.5037 7.19265 46.5873 7.24197 46.5873H13.5056C13.555 46.5873 13.6043 46.5121 13.6043 46.4284V42.2959C13.6043 42.2039 13.555 42.1369 13.5056 42.1369ZM24.0766 32.6255H17.813C17.7554 32.6255 17.7143 32.6924 17.7143 32.776V36.9086C17.7143 36.9922 17.7554 37.0675 17.813 37.0675H24.0766C24.126 37.0675 24.1671 37.0006 24.1671 36.9086V32.7342C24.1671 32.6506 24.1671 32.5836 24.0766 32.5836V32.6255ZM24.0766 51.7321H17.813C17.7554 51.7321 17.7143 51.8074 17.7143 51.891V56.0235C17.7143 56.1072 17.7554 56.1825 17.813 56.1825H24.0766C24.126 56.1825 24.1671 56.1156 24.1671 56.0235V51.8659C24.1671 51.7739 24.1671 51.707 24.0766 51.707V51.7321ZM24.0766 42.1788H17.813C17.7554 42.1788 17.7143 42.2457 17.7143 42.3377V46.4284C17.7143 46.5037 17.7554 46.5873 17.813 46.5873H24.0766C24.126 46.5873 24.1671 46.5121 24.1671 46.4284V42.2959C24.1671 42.2039 24.1671 42.1369 24.0766 42.1369V42.1788ZM87.5026 32.6255H93.7663C93.8156 32.6255 93.8649 32.6924 93.8649 32.776V36.9086C93.8649 36.9922 93.8156 37.0675 93.7663 37.0675H87.5026C87.4533 37.0675 87.4039 37.0006 87.4039 36.9086V32.7342C87.4039 32.6506 87.4533 32.5836 87.5026 32.5836V32.6255ZM87.5026 61.2937H93.7663C93.8156 61.2937 93.8649 61.369 93.8649 61.4443V65.5768C93.8649 65.6521 93.8156 65.7358 93.7663 65.7358H87.5026C87.4533 65.7358 87.4039 65.6605 87.4039 65.5768V61.4025C87.4039 61.3272 87.4533 61.2519 87.5026 61.2519V61.2937ZM76.9316 61.2937H83.1953C83.2528 61.2937 83.2939 61.369 83.2939 61.4443V65.5768C83.2939 65.6521 83.2939 65.7358 83.1953 65.7358H76.9316C76.8823 65.7358 76.8412 65.6605 76.8412 65.5768V61.4025C76.8412 61.3272 76.8412 61.2519 76.9316 61.2519V61.2937ZM87.5026 51.7321H93.7663C93.8156 51.7321 93.8649 51.8074 93.8649 51.891V56.0235C93.8649 56.1072 93.8156 56.1825 93.7663 56.1825H87.5026C87.4533 56.1825 87.4039 56.1156 87.4039 56.0235V51.8659C87.4039 51.7739 87.4533 51.707 87.5026 51.707V51.7321ZM87.5026 42.1788H93.7663C93.8156 42.1788 93.8649 42.2457 93.8649 42.3377V46.4284C93.8649 46.5037 93.8156 46.5873 93.7663 46.5873H87.5026C87.4533 46.5873 87.4039 46.5121 87.4039 46.4284V42.2959C87.4039 42.2039 87.4533 42.1369 87.5026 42.1369V42.1788ZM76.9316 32.6255H83.1953C83.2528 32.6255 83.2939 32.6924 83.2939 32.776V36.9086C83.2939 36.9922 83.2939 37.0675 83.1953 37.0675H76.9316C76.8823 37.0675 76.8412 37.0006 76.8412 36.9086V32.7342C76.8412 32.6506 76.8412 32.5836 76.9316 32.5836V32.6255ZM76.9316 51.7321H83.1953C83.2528 51.7321 83.2939 51.8074 83.2939 51.891V56.0235C83.2939 56.1072 83.2939 56.1825 83.1953 56.1825H76.9316C76.8823 56.1825 76.8412 56.1156 76.8412 56.0235V51.8659C76.8412 51.7739 76.8412 51.707 76.9316 51.707V51.7321ZM76.9316 42.1788H83.1953C83.2528 42.1788 83.2939 42.2457 83.2939 42.3377V46.4284C83.2939 46.5037 83.2939 46.5873 83.1953 46.5873H76.9316C76.8823 46.5873 76.8412 46.5121 76.8412 46.4284V42.2959C76.8412 42.2039 76.8412 42.1369 76.9316 42.1369V42.1788ZM35.3463 9.06845H42.1608C42.2117 9.06841 42.2607 9.08841 42.2974 9.12427C42.3342 9.16013 42.3559 9.20907 42.358 9.26086V16.2042C42.3559 16.2559 42.3342 16.3049 42.2974 16.3407C42.2607 16.3766 42.2117 16.3966 42.1608 16.3966H35.3463C35.2962 16.3966 35.2481 16.3763 35.2126 16.3402C35.1772 16.3041 35.1573 16.2552 35.1573 16.2042V9.26086C35.1573 9.20983 35.1772 9.16089 35.2126 9.12481C35.2481 9.08873 35.2962 9.06845 35.3463 9.06845ZM58.7817 9.06845H65.5961C65.6471 9.06841 65.696 9.08841 65.7328 9.12427C65.7696 9.16013 65.7913 9.20907 65.7934 9.26086V16.2042C65.7913 16.2559 65.7696 16.3049 65.7328 16.3407C65.696 16.3766 65.6471 16.3966 65.5961 16.3966H58.7735C58.7226 16.3966 58.6736 16.3766 58.6368 16.3407C58.6 16.3049 58.5783 16.2559 58.5762 16.2042V9.26086C58.5783 9.20907 58.6 9.16013 58.6368 9.12427C58.6736 9.08841 58.7226 9.06841 58.7735 9.06845H58.7817ZM47.0599 9.06845H53.8826C53.9327 9.06845 53.9808 9.08873 54.0162 9.12481C54.0517 9.16089 54.0716 9.20983 54.0716 9.26086V16.2042C54.0716 16.2552 54.0517 16.3041 54.0162 16.3402C53.9808 16.3763 53.9327 16.3966 53.8826 16.3966H47.0599C47.0104 16.3945 46.9635 16.3736 46.9285 16.3379C46.8934 16.3023 46.8729 16.2545 46.8708 16.2042V9.26086C46.8729 9.21049 46.8934 9.16274 46.9285 9.12709C46.9635 9.09144 47.0104 9.07051 47.0599 9.06845ZM35.3463 24.0927H42.1608C42.2131 24.0927 42.2633 24.1139 42.3003 24.1515C42.3372 24.1892 42.358 24.2403 42.358 24.2935V31.2284C42.358 31.2548 42.3529 31.2809 42.343 31.3053C42.3331 31.3296 42.3186 31.3518 42.3003 31.3704C42.2819 31.389 42.2602 31.4038 42.2362 31.4139C42.2123 31.424 42.1867 31.4292 42.1608 31.4292H35.3463C35.3208 31.4292 35.2955 31.424 35.272 31.4138C35.2485 31.4036 35.2273 31.3887 35.2097 31.3699C35.192 31.3512 35.1782 31.329 35.1692 31.3046C35.1602 31.2803 35.1562 31.2544 35.1573 31.2284V24.26C35.1633 24.2135 35.1858 24.1708 35.2207 24.1399C35.2555 24.1091 35.3002 24.0923 35.3463 24.0927ZM58.7817 24.0927H65.5961C65.6374 24.0993 65.6756 24.1191 65.7051 24.1491C65.7347 24.1792 65.7541 24.218 65.7605 24.26V31.195C65.7605 31.2482 65.7397 31.2993 65.7027 31.3369C65.6657 31.3746 65.6156 31.3957 65.5633 31.3957H58.7735C58.7212 31.3957 58.671 31.3746 58.634 31.3369C58.597 31.2993 58.5762 31.2482 58.5762 31.195V24.26C58.5762 24.2068 58.597 24.1557 58.634 24.1181C58.671 24.0804 58.7212 24.0593 58.7735 24.0593L58.7817 24.0927ZM47.0599 24.0927H53.8826C53.9081 24.0927 53.9334 24.098 53.9569 24.1081C53.9803 24.1183 54.0016 24.1333 54.0192 24.152C54.0369 24.1708 54.0507 24.193 54.0597 24.2173C54.0687 24.2416 54.0727 24.2675 54.0716 24.2935V31.2284C54.0727 31.2544 54.0687 31.2803 54.0597 31.3046C54.0507 31.329 54.0369 31.3512 54.0192 31.3699C54.0016 31.3887 53.9803 31.4036 53.9569 31.4138C53.9334 31.424 53.9081 31.4292 53.8826 31.4292H47.0599C47.009 31.427 46.9609 31.4049 46.9257 31.3675C46.8905 31.3301 46.8708 31.2803 46.8708 31.2284V24.26C46.8708 24.2082 46.8905 24.1584 46.9257 24.121C46.9609 24.0835 47.009 24.0614 47.0599 24.0593V24.0927ZM35.3463 54.1497H42.1608C42.2131 54.1497 42.2633 54.1708 42.3003 54.2085C42.3372 54.2461 42.358 54.2972 42.358 54.3504V61.2854C42.358 61.3386 42.3372 61.3897 42.3003 61.4273C42.2633 61.465 42.2131 61.4861 42.1608 61.4861H35.3463C35.3208 61.4862 35.2955 61.4809 35.272 61.4707C35.2485 61.4606 35.2273 61.4456 35.2097 61.4269C35.192 61.4081 35.1782 61.3859 35.1692 61.3616C35.1602 61.3373 35.1562 61.3113 35.1573 61.2854V54.3755C35.1562 54.3496 35.1602 54.3237 35.1692 54.2993C35.1782 54.275 35.192 54.2528 35.2097 54.2341C35.2273 54.2153 35.2485 54.2004 35.272 54.1902C35.2955 54.18 35.3208 54.1748 35.3463 54.1748V54.1497ZM58.7817 54.1497H65.5961C65.6471 54.1579 65.6929 54.1862 65.7236 54.2285C65.7544 54.2707 65.7676 54.3235 65.7605 54.3755V61.3105C65.7605 61.3637 65.7397 61.4148 65.7027 61.4524C65.6657 61.4901 65.6156 61.5112 65.5633 61.5112H58.7735C58.7212 61.5112 58.671 61.4901 58.634 61.4524C58.597 61.4148 58.5762 61.3637 58.5762 61.3105V54.3755C58.5762 54.3223 58.597 54.2712 58.634 54.2336C58.671 54.1959 58.7212 54.1748 58.7735 54.1748L58.7817 54.1497ZM47.0599 54.1497H53.8826C53.9081 54.1497 53.9334 54.1549 53.9569 54.1651C53.9803 54.1753 54.0016 54.1902 54.0192 54.209C54.0369 54.2277 54.0507 54.2499 54.0597 54.2742C54.0687 54.2986 54.0727 54.3245 54.0716 54.3504V61.2854C54.0727 61.3113 54.0687 61.3373 54.0597 61.3616C54.0507 61.3859 54.0369 61.4081 54.0192 61.4269C54.0016 61.4456 53.9803 61.4606 53.9569 61.4707C53.9334 61.4809 53.9081 61.4862 53.8826 61.4861H47.0599C47.009 61.484 46.9609 61.4619 46.9257 61.4245C46.8905 61.387 46.8708 61.3372 46.8708 61.2854V54.3755C46.8708 54.3237 46.8905 54.2739 46.9257 54.2365C46.9609 54.199 47.009 54.1769 47.0599 54.1748V54.1497ZM35.3463 39.1254H42.1608C42.2117 39.1253 42.2607 39.1453 42.2974 39.1812C42.3342 39.2171 42.3559 39.266 42.358 39.3178V46.2611C42.3581 46.2871 42.3529 46.3128 42.3429 46.3367C42.3329 46.3606 42.3182 46.3822 42.2998 46.4002C42.2813 46.4182 42.2595 46.4322 42.2356 46.4413C42.2117 46.4505 42.1863 46.4546 42.1608 46.4535H35.3463C35.2962 46.4535 35.2481 46.4332 35.2126 46.3971C35.1772 46.3611 35.1573 46.3121 35.1573 46.2611V39.3178C35.1573 39.2668 35.1772 39.2178 35.2126 39.1817C35.2481 39.1457 35.2962 39.1254 35.3463 39.1254ZM58.7817 39.1254H65.5961C65.6412 39.1331 65.6822 39.1565 65.7122 39.1916C65.7422 39.2267 65.7593 39.2713 65.7605 39.3178V46.2611C65.7606 46.2871 65.7554 46.3128 65.7454 46.3367C65.7354 46.3606 65.7207 46.3822 65.7023 46.4002C65.6838 46.4182 65.662 46.4322 65.6381 46.4413C65.6142 46.4505 65.5888 46.4546 65.5633 46.4535H58.7735C58.748 46.4546 58.7225 46.4505 58.6986 46.4413C58.6747 46.4322 58.6529 46.4182 58.6345 46.4002C58.616 46.3822 58.6013 46.3606 58.5913 46.3367C58.5813 46.3128 58.5762 46.2871 58.5762 46.2611V39.3178C58.5783 39.266 58.6 39.2171 58.6368 39.1812C58.6736 39.1453 58.7226 39.1253 58.7735 39.1254H58.7817ZM47.0599 39.1254H53.8826C53.9327 39.1254 53.9808 39.1457 54.0162 39.1817C54.0517 39.2178 54.0716 39.2668 54.0716 39.3178V46.2611C54.0716 46.3121 54.0517 46.3611 54.0162 46.3971C53.9808 46.4332 53.9327 46.4535 53.8826 46.4535H47.0599C47.0337 46.4558 47.0074 46.4526 46.9825 46.4439C46.9576 46.4353 46.9348 46.4215 46.9155 46.4034C46.8961 46.3853 46.8807 46.3633 46.8702 46.3388C46.8597 46.3143 46.8543 46.2878 46.8544 46.2611V39.3178C46.8564 39.2674 46.877 39.2197 46.912 39.184C46.947 39.1484 46.994 39.1275 47.0435 39.1254H47.0599Z" fill="url(#paint0_linear_1214_51228)" />
                <defs>
                    <linearGradient id="paint0_linear_1214_51228" x1="0" y1="0" x2="115.56" y2="27.2444" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#51ADAC" />
                        <stop offset="1" stop-color="#4FA874" />
                    </linearGradient>
                </defs>
            </svg>} />
        </Grid2>
        <Grid2 item sx={{ width: "24.2%" }}>
            <SummaryCard title="Avg Intensity by Revenue" value={data.revenueIntensity} unit="$" svg={<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 132 94" fill="none">
                <path opacity="0.1" d="M2.33105 94C1.04199 94 0 93.022 0 91.8075C0 90.593 1.04199 89.6149 2.33105 89.6149H12.1709V22.1297C12.1709 21.4311 12.4609 20.7862 12.9229 20.324C13.3955 19.8511 14.0293 19.5609 14.7275 19.5609H28.7139C29.4229 19.5609 30.0566 19.8511 30.5186 20.324C30.9805 20.7862 31.2705 21.4311 31.2705 22.1297V89.6042H41.6797V41.7014C41.6797 41.0027 41.9697 40.3686 42.4316 39.8957C42.8936 39.4336 43.5381 39.1434 44.2256 39.1434H58.2119C58.9316 39.1434 59.5654 39.4336 60.0166 39.8957C60.4785 40.3579 60.7686 41.0135 60.7686 41.7014V89.6042H71.1777V2.55797C71.1777 1.85936 71.4678 1.22525 71.9297 0.752344C72.4238 0.29019 73.0576 0 73.7666 0H87.7529C88.4619 0 89.0957 0.29019 89.5576 0.752344C90.0195 1.2145 90.3096 1.87011 90.3096 2.55797V89.6042H100.719V27.7292C100.719 27.0306 101.009 26.3858 101.471 25.9236C101.933 25.4615 102.577 25.1713 103.286 25.1713H117.272C117.981 25.1713 118.626 25.4615 119.077 25.9236C119.539 26.3858 119.829 27.0306 119.829 27.7292V89.6149H129.669C130.958 89.6149 132 90.593 132 91.8075C132 93.022 130.958 94 129.669 94H117.562C117.541 94 117.52 94 117.498 94H103.061C103.039 94 103.018 94 102.996 94H88.043C88.0215 94 88 94 87.9785 94H73.541C73.5195 94 73.498 94 73.4766 94H58.5342C58.5127 94 58.4912 94 58.4697 94H44.0215C44 94 43.9785 94 43.957 94H29.0039H28.9395H14.502H14.4375H2.33105ZM26.6084 24.2362H16.833V89.3247H26.6084V24.2362ZM56.1279 43.8079H46.3525V89.3247H56.1279V43.8079ZM85.6475 4.66453H75.8721V89.3247H85.6475V4.66453ZM115.156 29.8358H105.381V89.3355H115.156V29.8358Z" fill="url(#paint0_linear_1214_51236)" />
                <defs>
                    <linearGradient id="paint0_linear_1214_51236" x1="0" y1="0" x2="146.919" y2="42.8612" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#51ADAC" />
                        <stop offset="1" stop-color="#4FA874" />
                    </linearGradient>
                </defs>
            </svg>} />
        </Grid2>
        <Grid2 item sx={{ width: "24.2%" }}>
            <SummaryCard title="Avg Intensity by Total Employees" value={data.employeeIntensity} unit=""
                svg={
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="75" viewBox="0 0 139 90" fill="none">
                        <path opacity="0.1" d="M61.412 63.1259V89.9434H58.0524V61.768L53.7992 60.0368L44.8062 69.8473H42.295L33.3021 60.0368L29.0488 61.768V89.9434H25.6892V63.1259L19.3546 65.7284V89.9321H15.995V67.0863L11.3684 68.9646C8.8798 70.3225 6.9681 71.9972 5.64461 73.9434C4.30981 75.8784 3.56323 78.1075 3.35962 80.6874V89.9321H0V80.6535V80.5403C0.226237 77.3833 1.15381 74.611 2.83927 72.1782C4.45687 69.7794 6.7758 67.7765 9.72819 66.1584C9.78475 66.1245 9.87525 66.0679 9.95443 66.0453L31.8202 57.1061V50.7129C31.594 50.5092 31.3904 50.3395 31.1868 50.1018C28.1439 47.0919 26.0964 42.611 25.4856 35.8671L24.3883 34.7355C24.0377 34.4413 23.8341 34.0113 23.8341 33.5474V30.9449H27.1937V32.9364L28.3249 34.0905C28.619 34.3847 28.7547 34.7242 28.7887 35.075C29.2524 41.3211 30.9832 45.3154 33.5849 47.8614C36.1074 50.3168 39.5123 51.5389 43.3923 52.1386C47.555 51.471 50.8581 49.6832 53.1996 46.9335C55.7109 44.0142 57.2153 39.9859 57.7131 35.041C57.747 34.7242 57.8601 34.43 58.0637 34.2037L59.0705 32.959L59.1044 30.8204L62.4301 30.8543L62.3962 33.4342C62.4301 33.8077 62.3057 34.215 62.0455 34.5318L60.9709 35.8671C60.394 41.2532 58.6293 45.7002 55.7674 49.0382C55.3376 49.5248 54.8964 49.9887 54.4326 50.4526V56.8798L77.0563 66.1132C77.1468 66.1471 77.2034 66.1697 77.2826 66.2263C80.2349 67.8444 82.5426 69.8699 84.1715 72.2461C85.823 74.6789 86.7732 77.4512 87.0107 80.6082V90H83.6511V80.7214C83.4475 78.1414 82.7009 75.9123 81.3661 73.9774C80.0313 72.0424 78.131 70.3564 75.6423 68.9986L71.0158 67.1202V89.966H67.6562V65.7511L61.3215 63.1485L61.412 63.1259ZM113.401 63.1259V89.9434H110.042V61.768L105.788 60.0368L96.7955 69.8473H94.2843L85.2913 60.0368L81.0381 61.768V63.4993C79.8503 62.4357 78.5042 61.2475 76.9884 59.901L83.8208 57.1061V50.7129C83.5946 50.5092 83.391 50.3395 83.1873 50.1018C80.1445 47.0919 78.097 42.611 77.4862 35.8671L76.3889 34.7355C76.0382 34.4413 75.8346 34.0113 75.8346 33.5474V30.9449H79.1829V32.9364L80.3141 34.0905C80.6082 34.3847 80.744 34.7242 80.7779 35.075C81.2417 41.3211 82.9724 45.3154 85.5741 47.8614C88.0967 50.3168 91.5015 51.5389 95.3815 52.1386C99.5443 51.471 102.847 49.6832 105.189 46.9335C107.7 44.0142 109.205 39.9859 109.702 35.041C109.736 34.7242 109.849 34.43 110.053 34.2037L111.06 32.959L111.094 30.8204L114.419 30.8543L114.385 33.4342C114.419 33.8077 114.295 34.215 114.035 34.5318L112.96 35.8671C112.383 41.2532 110.619 45.7002 107.757 49.0382C107.327 49.5248 106.886 49.9887 106.422 50.4526V56.8798L129.046 66.1132C129.136 66.1471 129.193 66.1697 129.272 66.2263C132.224 67.8444 134.532 69.8699 136.161 72.2461C137.812 74.6789 138.762 77.4512 139 80.6082V90H135.64V80.7214C135.437 78.1414 134.69 75.9123 133.355 73.9774C132.021 72.0424 130.12 70.3564 127.632 68.9986L123.005 67.1202V89.966H119.645V65.7511L113.311 63.1485L113.401 63.1259ZM88.3455 4.76098C88.1419 4.76098 87.9723 4.72703 87.7913 4.67046C82.9272 6.84302 79.002 11.6181 77.9273 19.5729C77.8142 20.4441 76.9771 21.0778 76.0722 20.9647C75.1446 20.8515 74.5112 20.0707 74.6243 19.1655C75.8686 9.87555 80.6422 4.2631 86.513 1.68319C89.488 0.381915 92.7006 -0.138595 95.9132 0.0311366C99.0918 0.200868 102.282 1.07215 105.11 2.54316C111.128 5.66621 115.72 11.5163 116.048 19.2673C116.082 20.1613 115.358 20.8854 114.453 20.9194C113.526 20.9533 112.745 20.2518 112.723 19.3918C112.44 12.8854 108.594 7.99719 103.537 5.3607C103.334 5.24754 103.108 5.13439 102.87 5.04387C102.7 5.10044 102.497 5.13439 102.259 5.13439C100.755 5.10044 100.347 7.79351 100.268 11.4371C100.234 13.0552 100.268 14.8543 100.302 16.6987C100.336 18.1471 100.359 19.6521 100.359 20.6365C100.359 21.5304 99.6008 22.2546 98.7072 22.2546C97.7796 22.2546 97.0557 21.5304 97.0557 20.6365C97.0557 19.0184 97.0217 17.8869 96.9991 16.7553C96.9652 14.877 96.9426 13.0552 96.9652 11.3692C97.0557 8.06508 97.429 5.32675 98.6393 3.61812C97.6891 3.41445 96.705 3.26735 95.6869 3.21077C94.4426 3.15419 93.1983 3.17682 91.988 3.3805C93.0852 5.08913 93.4585 7.83877 93.549 11.0524C93.6055 12.7836 93.549 14.6959 93.5151 16.6422C93.4811 17.7963 93.4585 18.9845 93.4585 20.6365C93.4585 21.5304 92.7345 22.2546 91.8409 22.2546C90.9473 22.2546 90.2233 21.5304 90.2233 20.6365C90.2233 19.6294 90.2572 18.0905 90.2799 16.5856C90.3138 14.6733 90.3364 12.8289 90.3138 11.1202C90.2233 7.38616 89.8274 4.63651 88.255 4.67046L88.3455 4.76098ZM87.2144 52.9646V57.2192L95.5399 66.3055L103.119 58.034V52.8289C100.981 54.0736 98.5149 54.9109 95.7435 55.3183C95.5738 55.3522 95.3702 55.3522 95.1892 55.3183C92.2934 54.8883 89.6012 54.1641 87.203 52.942V52.9646H87.2144ZM74.7826 21.3041C75.2125 22.232 76.0609 23.0354 77.2147 23.7596C80.9137 26.0792 87.4293 27.1994 94.1711 27.1994C100.936 27.2334 107.858 26.1245 112.304 24.0198C114.035 23.1825 115.37 22.2207 116.037 21.157L118.899 22.8091C117.881 24.4272 116.094 25.819 113.775 26.9166C108.888 29.2362 101.422 30.447 94.1598 30.413C86.8411 30.3791 79.6694 29.1118 75.4161 26.4526C73.7419 25.4116 72.4976 24.133 71.7737 22.662L74.8053 21.3267L74.7826 21.3041ZM93.2323 73.7058H97.2819V77.6096H93.2323V73.7058ZM93.2323 83.6634H97.2819V87.5672H93.2323V83.6634ZM36.3563 4.76098C36.1527 4.76098 35.983 4.72703 35.802 4.67046C30.9379 6.84302 27.0127 11.6181 25.9381 19.5729C25.825 20.4441 24.9879 21.0778 24.0829 20.9647C23.1554 20.8515 22.5219 20.0707 22.635 19.1655C23.8793 9.87555 28.6529 4.2631 34.5238 1.68319C37.4988 0.381915 40.7113 -0.138595 43.9239 0.0311366C47.1025 0.200868 50.2925 1.07215 53.1204 2.54316C59.1384 5.66621 63.731 11.5163 64.059 19.2673C64.0929 20.1613 63.369 20.8854 62.464 20.9194C61.5365 20.9533 60.7559 20.2518 60.7333 19.3918C60.4392 12.8854 56.5932 7.98587 51.5368 5.3607C51.3332 5.24754 51.1069 5.13439 50.8694 5.04387C50.6997 5.10044 50.4961 5.13439 50.2585 5.13439C48.7541 5.10044 48.3468 7.79351 48.2677 11.4371C48.2337 13.0552 48.2677 14.8543 48.3016 16.6987C48.3355 18.1471 48.3582 19.6521 48.3582 20.6365C48.3582 21.5304 47.6003 22.2546 46.7066 22.2546C45.7791 22.2546 45.0551 21.5304 45.0551 20.6365C45.0551 19.0184 45.0212 17.8869 44.9985 16.7553C44.9646 14.877 44.942 13.0552 44.9646 11.3692C45.0551 8.06508 45.4284 5.32675 46.6388 3.61812C45.6886 3.41445 44.7044 3.26735 43.6864 3.21077C42.4421 3.15419 41.1978 3.17682 39.9874 3.3805C41.0846 5.08913 41.4579 7.83877 41.5484 11.0524C41.605 12.7836 41.5484 14.6959 41.5145 16.6422C41.4806 17.7963 41.4579 18.9845 41.4579 20.6365C41.4579 21.5304 40.734 22.2546 39.8403 22.2546C38.9467 22.2546 38.2227 21.5304 38.2227 20.6365C38.2227 19.6294 38.2567 18.0905 38.2793 16.5856C38.3132 14.6733 38.3359 12.8289 38.3132 11.1202C38.2227 7.38616 37.8268 4.63651 36.2545 4.67046L36.3563 4.76098ZM35.2364 52.9646V57.2192L43.5619 66.3055L51.1409 58.034V52.8289C49.0029 54.0736 46.5369 54.9109 43.7655 55.3183C43.5959 55.3522 43.3923 55.3522 43.2113 55.3183C40.3154 54.8883 37.6232 54.1641 35.2251 52.942V52.9646H35.2364ZM22.7934 21.3041C23.2232 22.232 24.0716 23.0354 25.2254 23.7596C28.9244 26.0792 35.44 27.1994 42.1819 27.1994C48.9464 27.2334 55.8692 26.1245 60.3148 24.0198C62.0455 23.1825 63.3803 22.2207 64.0477 21.157L66.9096 22.8091C65.8915 24.4272 64.1042 25.819 61.7853 26.9166C56.8986 29.2362 49.4328 30.447 42.1706 30.413C34.8518 30.3791 27.6801 29.1118 23.4268 26.4526C21.7527 25.4116 20.5084 24.133 19.7844 22.662L22.816 21.3267L22.7934 21.3041ZM41.2543 73.7058H45.304V77.6096H41.2543V73.7058ZM41.2543 83.6634H45.304V87.5672H41.2543V83.6634Z" fill="url(#paint0_linear_1214_51244)" />
                        <defs>
                            <linearGradient id="paint0_linear_1214_51244" x1="0" y1="0" x2="152.207" y2="48.837" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#51ADAC" />
                                <stop offset="1" stop-color="#4FA874" />
                            </linearGradient>
                        </defs>
                    </svg>} />
        </Grid2>
        <Grid2 item sx={{ width: "24.2%" }}>
            <SummaryCard title="Avg Intensity by Total Production" value={data.productionIntensity} unit="tonnes"
                svg={
                    <svg width="135" height="92" viewBox="0 0 135 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.1" clip-path="url(#clip0_3168_109525)">
                            <path d="M92.6402 99.011C89.9259 99.2985 87.0621 99.4523 84.0987 99.4523C75.2024 99.4523 67.2258 98.0659 61.5372 95.8824C58.687 94.7885 56.5007 93.5284 55.0572 92.218C53.6143 90.908 53.0532 89.6861 53.0532 88.6094C53.0532 87.7624 53.3994 86.8401 54.2504 85.8433L54.6695 85.3525V84.707V77.8779V77.2002L54.2131 76.6993C53.6954 76.1312 53.3202 75.4626 53.0794 74.8629C55.9354 76.6424 59.7833 78.0411 64.0798 79.0766C69.3522 80.3473 75.4896 81.115 81.721 81.3067C83.5503 81.365 85.3912 81.3726 87.2246 81.3283C87.1964 81.7261 87.1818 82.1254 87.1818 82.5265C87.1818 86.2889 87.8867 89.8666 89.3069 93.238C90.168 95.2841 91.2814 97.2092 92.6402 99.011Z" stroke="url(#paint0_linear_3168_109525)" stroke-width="3.5" />
                            <path d="M81.8417 77.2032C84.5074 77.285 87.1916 77.2586 89.8336 77.1189C91.3734 72.2726 94.6957 67.3103 98.3502 61.8575L81.8417 77.2032ZM81.8417 77.2032C70.0503 76.842 58.7994 74.3872 53.9637 70.4664M81.8417 77.2032L53.9637 70.4664M53.9637 70.4664C53.4943 70.0867 53.0988 69.7018 52.7771 69.3142L54.0244 70.3914L54.0245 70.3914L54.1016 70.458L54.1215 70.4349L54.1376 70.4162L54.1581 70.3927C54.1597 70.3909 54.1609 70.3896 54.1618 70.3886L53.9637 70.4664ZM96.8964 60.8833L96.8141 61.0061C93.5049 65.9435 90.3096 70.711 88.566 75.4257C86.3551 75.5138 84.1192 75.5222 81.8953 75.454L81.8953 75.454C76.0954 75.2764 70.4532 74.5839 65.6945 73.466C60.8822 72.3356 57.1727 70.8153 55.0658 69.1071L55.0643 69.1059C54.9218 68.9906 54.7904 68.8771 54.6695 68.7658V40.4975V39.8178L54.2108 39.3163C53.6498 38.703 53.2561 37.9719 53.0199 37.335C55.8819 39.1331 59.7536 40.5441 64.0798 41.5867C69.3525 42.8574 75.4901 43.6252 81.7216 43.8181L81.7217 43.8181C90.7469 44.0972 100.2 43.1752 107.635 40.7007C105.737 47.6556 101.169 54.5077 96.8965 60.8832C96.8965 60.8833 96.8964 60.8833 96.8964 60.8833Z" stroke="url(#paint1_linear_3168_109525)" stroke-width="3.5" />
                            <path d="M105.991 5.17178L105.99 5.1715C100.417 3.07882 92.6455 1.75 84.0221 1.75C75.4021 1.75 67.63 3.07858 62.0458 5.17153L105.991 5.17178ZM105.991 5.17178C109.016 6.30611 111.34 7.65378 112.879 9.08969C114.408 10.5168 115.06 11.9248 115.06 13.2601C115.06 14.2255 114.72 15.2099 113.971 16.2188L113.625 16.6835M105.991 5.17178L113.625 16.6835M113.625 16.6835V17.2626M113.625 16.6835V17.2626M113.625 17.2626V30.9159C113.092 31.4146 112.477 31.8943 111.778 32.3546L111.777 32.3552L113.625 17.2626ZM81.831 39.7143L81.885 37.9651C81.8848 37.9651 81.8846 37.9651 81.8844 37.9651L81.831 39.7143ZM54.086 33.0851C54.083 33.0829 54.0801 33.0806 54.0772 33.0783L53.9689 32.9754L54.0608 32.862L54.086 33.0851ZM55.0616 31.6249C54.9173 31.5079 54.786 31.395 54.6667 31.2858V17.5922V16.968L54.2717 16.4847C53.3761 15.3889 52.9766 14.3103 52.9766 13.2601C52.9766 11.9214 53.6297 10.5136 55.1597 9.08742C56.6993 7.6523 59.0234 6.30644 62.0449 5.17187L55.0616 31.6249Z" stroke="url(#paint2_linear_3168_109525)" stroke-width="3.5" />
                            <path d="M99.9368 79.6701L99.9359 79.661C99.7406 77.546 101.315 75.6897 103.403 75.4953C105.528 75.2952 107.373 76.8811 107.571 78.9589C107.824 81.5821 108.391 83.9002 109.406 85.8216L99.9368 79.6701ZM99.9368 79.6701C100.273 83.1098 101.061 86.4265 102.623 89.3939M99.9368 79.6701L102.623 89.3939M102.623 89.3939C105.805 95.4866 109.572 97.8807 112.701 97.3284C114.232 97.0581 115.534 96.0145 115.881 94.4975C116.25 92.8876 115.419 91.3695 113.929 90.4908L113.924 90.4876C111.811 89.2516 110.379 87.6602 109.406 85.8228L102.623 89.3939ZM115.289 46.9407C116.702 50.4015 118.605 53.7702 120.621 57.0264C121.792 58.9181 122.985 60.7507 124.157 62.5507C126.084 65.5088 127.953 68.379 129.571 71.2793L129.571 71.2794C133.805 78.873 134.21 86.3953 131.683 91.9014C129.192 97.3266 123.696 101.146 115.284 101.146C106.079 101.146 100.706 97 98.5648 91.2492C96.3658 85.344 97.4102 77.3093 102.102 69.4119L102.102 69.4116C103.387 67.2477 104.804 65.0599 106.259 62.8226C106.331 62.7113 106.404 62.5999 106.476 62.4883C107.856 60.3675 109.264 58.2029 110.586 56.0186C112.366 53.0779 114.026 50.0468 115.289 46.9407Z" stroke="url(#paint3_linear_3168_109525)" stroke-width="3.5" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M68.1198 12.043C70.3347 12.043 72.1303 12.6679 72.1303 13.4431C72.1303 14.2156 70.3347 14.8432 68.1198 14.8432C65.905 14.8432 64.1094 14.2156 64.1094 13.4431C64.1094 12.6758 65.905 12.043 68.1198 12.043Z" fill="url(#paint4_linear_3168_109525)" />
                            <path d="M105.104 6.72293L105.104 6.72299C107.539 7.63382 109.501 8.67764 110.852 9.79433C112.205 10.9128 112.926 12.0881 112.926 13.2625C112.926 14.4369 112.205 15.6122 110.852 16.7307C109.501 17.8474 107.539 18.8912 105.104 19.802L105.104 19.8021C99.7518 21.8122 92.3011 23.0553 84.0174 23.0553C75.7364 23.0553 68.283 21.8043 62.9303 19.802C60.4961 18.8912 58.534 17.8493 57.1831 16.7336C55.8301 15.6162 55.1084 14.4409 55.1084 13.2625C55.1084 12.0881 55.83 10.9128 57.1831 9.79433C58.5341 8.67764 60.4961 7.63382 62.9303 6.72299L62.9304 6.72293C68.2829 4.71278 75.7363 3.46973 84.0174 3.46973C92.3011 3.46973 99.7518 4.71278 105.104 6.72293Z" stroke="white" stroke-width="0.263672" />
                            <path d="M67.198 12.7607C68.6203 12.7607 69.81 13.0237 70.5697 13.3658C70.6267 13.3914 70.6789 13.4162 70.7266 13.44C70.679 13.4637 70.627 13.4884 70.5702 13.5139C69.8102 13.8559 68.6203 14.1189 67.198 14.1189C65.7773 14.1189 64.5881 13.856 63.8285 13.514C63.7716 13.4884 63.7195 13.4637 63.6718 13.44C63.7196 13.4162 63.7718 13.3914 63.8289 13.3657C64.5883 13.0236 65.7773 12.7607 67.198 12.7607ZM71.2083 13.7674C71.2075 13.7677 71.202 13.7614 71.1943 13.7481C71.2053 13.7605 71.2091 13.7672 71.2083 13.7674ZM71.195 13.132C71.2027 13.1186 71.2082 13.1124 71.209 13.1126C71.2098 13.1128 71.2059 13.1195 71.195 13.132ZM63.1898 13.1127C63.1906 13.1125 63.1961 13.1187 63.2038 13.1321C63.1928 13.1196 63.189 13.1129 63.1898 13.1127ZM63.2044 13.748C63.1968 13.7613 63.1913 13.7676 63.1905 13.7673C63.1897 13.7671 63.1935 13.7604 63.2044 13.748Z" stroke="url(#paint5_linear_3168_109525)" stroke-width="3.97059" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_3168_109525" x1="51" y1="71.3652" x2="100.541" y2="86.9071" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_3168_109525" x1="51" y1="33.7422" x2="123.675" y2="56.7101" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_3168_109525" x1="51.2266" y1="0" x2="122.111" y2="24.2904" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_3168_109525" x1="95.7109" y1="41.2676" x2="142.346" y2="47.4444" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_3168_109525" x1="64.1094" y1="12.043" x2="71.2633" y2="16.3001" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <linearGradient id="paint5_linear_3168_109525" x1="61.2813" y1="10.7754" x2="73.0669" y2="16.2139" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#369D9C" />
                                <stop offset="1" stop-color="#28814D" />
                            </linearGradient>
                            <clipPath id="clip0_3168_109525">
                                <rect width="135" height="102.895" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                } />
        </Grid2>
    </div>
);

export default OverallSummary;
