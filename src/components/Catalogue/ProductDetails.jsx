//main.jsx
// Our data we will use:

const products = [
    {
        "id": "1",
        "name": "Touareg",
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
        "cost": "677.32",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "name": "Suburban 2500",
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
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
        "image": "https://tse3.mm.bing.net/th?id=OIP.EEGC3fuEH837HabdqLfG0QHaEK&pid=Api",
        "cost": "4801.29",
        "short_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
        "bullet_description": [
            "Capacity Spacious: The 2 person tent designed for a roomy and convenient experience. The camping tent with an interior center height of 47 inches and 82.7 x 82.7 inches base dimensions, it is a spacious camp tent with plenty of space for you",
            "Stable & Safe: To keep your camp equipment dry, the sturdy polyester material on the outdoor tent body and the removable rain fly help to ensure water does not make its way into the inside of your waterproof tent for a dry travel",
            "Ventilation Design: Large window design for enhanced airflow. A D-style door will keep an open view. Also, two person tent comes with a storage pocket that helps to clear clutter and keep the inside of the dome tent organized. Great tents for camping",
            "Easy Set-Up & Carry: The camp tent equip with 2 ropes and 6 stakes for safe and stable. It only takes 1-2 people 5 minutes to set up. The carry bag weighs only 5.7lbs. A lightweight tent can be store in the car without taking up much space"
        ]
    }
]

export default products;
