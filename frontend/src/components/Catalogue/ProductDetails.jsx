//main.jsx
// Our data we will use:

const products = [
    {
        "id": "1",
        "name": "Touareg",
        "make":"volkswagen",
        "year":"2010",
        "type": "SUV",
        "color":"white",
        "mileage": "100 000km",
        "transmission": 'automatic' ,
        "fuelType": "diesel",
        "image": "https://www.generation4x4mag.fr/wp-content/uploads/2020/11/VOLKSWAGEN-Touareg-5281_79-scaled.jpg",
        "price": "500",
        "location":"Montreal",
        "short_description": "Good familiar vehicule",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "2",
        "name": "DeVille",
        "image": "https://www.pauls-classic-cars.fr/wp-content/uploads/thememakers/cardealer/3/5393/main/6411acd257089.jpg",
        "cost": "3474.41",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "3",
        "name": "F250",
        "image": "https://build.ford.com/dig/Ford/SuperDuty/2024/HD-TILE/Image%5B%7CFord%7CSuperDuty%7C2024%7C1%7C1.%7C603A.F2B.142.PUM.LSC.883.89S.A7AAK.CBC.XLT.~AASBA.924.BBHAB.BLDAE.54K.91X.66B.REC.CLFAE.SRW.648.TCH.4X4.99N.FBFAB.91Z.GTDAB.67D.43C.585.IEVAR.595.250.44G.X37.CLO.%5D/EXT/1/vehicle.png",
        "cost": "2878.07",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "4",
        "name": "Corvette",
        "image": "https://arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/2NBDZMUQNRFTDISJ7PDAAGLB6Y.jpg",
        "cost": "4379.01",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "5",
        "name": "MKX",
        "image": "https://i.gaw.to/vehicles/photos/08/38/083860_2018_lincoln_MKX.jpg?640x400",
        "cost": "3274.66",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "6",
        "name": "Accord",
        "image": "https://www.topgear.com/sites/default/files/2023/12/15%20Honda%20Accord%20review.jpg",
        "cost": "758.8",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "7",
        "name": "Hummer H1",
        "image": "https://media.hagerty.com/media/wp-content/uploads/2022/11/Bull-Market-2023_Hummer_Neveu_0455.jpg",
        "cost": "2691.62",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        "id": "8",
        "name": "LR2",
        "image": "https://i.gaw.to/vehicles/photos/05/07/050746_2014_landrover_LR2.jpg?1024x640",
        "cost": "4801.29",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    },
    {
        //This is how we have the data in the database
        "make":"Honda",
        "model":"CR-V",
        "year" : 2019,
        "type": "convertible",
        "color": "white",
        "mileage":350000,
        "location": "Montreal",
        "transmision": "manual",
        "fuelType":"electric",
        "seats":5,
        "pricePerDay": 60,
        "available":true, //don't know about this one
        "reservations" : [
            { "startDate": '2024-03-20',
              "endDate": '2024-03-22' },
            // ... other reservations
          ],
    }
]

export default products;
