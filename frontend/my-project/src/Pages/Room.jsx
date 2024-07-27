import React from 'react';
import RoomCard from '../Components/RoomCard/RoomCard';
 


const dummyData = [
  {
    id: 1,
    topic: "Which framework works best for frontend?",
    speaker: [
      {
        id: 1,
        name: "Jon Doe",
        avatar: "jon_doe.png"
      },
      {
        id: 2,
        name: "Shubh",
        avatar: "shubh.png"
      },
      {
        id: 3,
        name: "Sarthak",
        avatar: "sarthak.png"
      }
    ],
    totalPeople: 40
  },
  {
    id: 2,
    topic: "About Cricket",
    speaker: [
      {
        id: 25,
        name: "Chintu",
        avatar: "chintu.png"
      },
      {
        id: 30,
        name: "Mintu",
        avatar: "mintu.png"
      },
      {
        id: 70,
        name: "Sarthak23",
        avatar: "sarthak23.png"
      }
    ],
    totalPeople: 36
  },
  {
    id: 3,
    topic: "Future of Artificial Intelligence",
    speaker: [
      {
        id: 4,
        name: "Alice Johnson",
        avatar: "alice_johnson.png"
      },
      {
        id: 5,
        name: "Bob Smith",
        avatar: "bob_smith.png"
      }
    ],
    totalPeople: 50
  },
  {
    id: 4,
    topic: "The Rise of Remote Work",
    speaker: [
      {
        id: 6,
        name: "Emily Davis",
        avatar: "emily_davis.png"
      },
      {
        id: 7,
        name: "Michael Lee",
        avatar: "michael_lee.png"
      }
    ],
    totalPeople: 22
  },
  {
    id: 5,
    topic: "Blockchain Technology and Cryptocurrency",
    speaker: [
      {
        id: 8,
        name: "Raj Patel",
        avatar: "raj_patel.png"
      },
      {
        id: 9,
        name: "Zara Khan",
        avatar: "zara_khan.png"
      },
      {
        id: 10,
        name: "Anya Taylor",
        avatar: "anya_taylor.png"
      }
    ],
    totalPeople: 28
  },
  {
    id: 6,
    topic: "Climate Change and Sustainability",
    speaker: [
      {
        id: 11,
        name: "Liam O'Connor",
        avatar: "liam_oconnor.png"
      },
      {
        id: 12,
        name: "Sophia Turner",
        avatar: "sophia_turner.png"
      }
    ],
    totalPeople: 15
  },
  {
    id: 7,
    topic: "The Future of Space Exploration",
    speaker: [
      {
        id: 13,
        name: "Noah Wright",
        avatar: "noah_wright.png"
      },
      {
        id: 14,
        name: "Olivia Thompson",
        avatar: "olivia_thompson.png"
      },
      {
        id: 15,
        name: "Ethan Brown",
        avatar: "ethan_brown.png"
      }
    ],
    totalPeople: 44
  },
  {
    id: 8,
    topic: "Mental Health Awareness",
    speaker: [
      {
        id: 16,
        name: "Emma Wilson",
        avatar: "emma_wilson.png"
      },
      {
        id: 17,
        name: "James Moore",
        avatar: "james_moore.png"
      }
    ],
    totalPeople: 30
  },
  {
    id: 9,
    topic: "Advancements in Quantum Computing",
    speaker: [
      {
        id: 18,
        name: "Lucas Green",
        avatar: "lucas_green.png"
      },
      {
        id: 19,
        name: "Mia Hall",
        avatar: "mia_hall.png"
      }
    ],
    totalPeople: 20
  },
  {
    id: 10,
    topic: "Nutrition and Healthy Living",
    speaker: [
      {
        id: 20,
        name: "William Scott",
        avatar: "william_scott.png"
      },
      {
        id: 21,
        name: "Amelia King",
        avatar: "amelia_king.png"
      },
      {
        id: 22,
        name: "Elijah Martinez",
        avatar: "elijah_martinez.png"
      }
    ],
    totalPeople: 35
  },
  {
    id: 11,
    topic: "The Impact of Social Media",
    speaker: [
      {
        id: 23,
        name: "Ava Rodriguez",
        avatar: "ava_rodriguez.png"
      },
      {
        id: 24,
        name: "Benjamin Allen",
        avatar: "benjamin_allen.png"
      }
    ],
    totalPeople: 18
  },
  {
    id: 12,
    topic: "The Art of Mindfulness",
    speaker: [
      {
        id: 26,
        name: "Ella Clark",
        avatar: "ella_clark.png"
      },
      {
        id: 27,
        name: "Liam Martinez",
        avatar: "liam_martinez.png"
      }
    ],
    totalPeople: 25
  },
  {
    id: 13,
    topic: "Digital Marketing Trends in 2024",
    speaker: [
      {
        id: 28,
        name: "Henry Hill",
        avatar: "henry_hill.png"
      },
      {
        id: 29,
        name: "Grace Adams",
        avatar: "grace_adams.png"
      },
      {
        id: 31,
        name: "Jacob Wright",
        avatar: "jacob_wright.png"
      }
    ],
    totalPeople: 42
  },
  {
    id: 14,
    topic: "Innovations in Renewable Energy",
    speaker: [
      {
        id: 32,
        name: "Lucas Morgan",
        avatar: "lucas_morgan.png"
      },
      {
        id: 33,
        name: "Sophia Collins",
        avatar: "sophia_collins.png"
      }
    ],
    totalPeople: 33
  },
  {
    id: 15,
    topic: "Exploring Virtual Reality",
    speaker: [
      {
        id: 34,
        name: "Mason Young",
        avatar: "mason_young.png"
      },
      {
        id: 35,
        name: "Harper Perez",
        avatar: "harper_perez.png"
      },
      {
        id: 36,
        name: "Aiden Turner",
        avatar: "aiden_turner.png"
      }
    ],
    totalPeople: 27
  }
];




const Room = () => {
  return (
     <div>
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">All Voice Rooms</h1>
          <input
            className="border border-gray-300 bg-gray-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            placeholder="Search rooms..."
          />
        </div>
        <div>
          <button className="bg-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition duration-300">
            Add Room
          </button>
        </div>
      </div>
    </div>
    <div>
      <RoomCard/>
    </div>
    </div>
  );
};

export default Room;
