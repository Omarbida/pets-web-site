import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";
import { ChevronDown, ChevronUp, Search } from "react-feather";
const allPets = [
  {
    name: "Cony",
    image: "images/Cony-dog.jpg",
    type: "DOG",
    race: "dog-race-1",
    location: "Jijel",
    adopted: false,
  },
  {
    name: "Ernie",
    image: "images/Ernie-bird.jpg",
    type: "BIRD",
    race: "bird-race-2",
    location: "Oran",
    adopted: false,
  },
  {
    name: "Gideon",
    image: "images/Gideon-dog.jpg",
    type: "DOG",
    race: "dog-race-2",
    location: "Alger",
    adopted: false,
  },
  {
    name: "Kilo",
    image: "images/Kilo-dog.jpg",
    type: "DOG",
    race: "dog-race-3",
    location: "Sitif",
    adopted: false,
  },
  {
    name: "lgr parakeets",
    image: "images/Lgr-parakeets.jpg",
    type: "BIRD",
    race: "bird-race-1",
    location: "Constantine",
    adopted: false,
  },
  {
    name: "Remington",
    image: "images/Remington-cat.jpg",
    type: "CAT",
    race: "cat-race-2",
    location: "Alger",
    adopted: false,
  },
  {
    name: "Roderick",
    image: "images/Roderick-cat.jpg",
    type: "CAT",
    race: "cat-race-3",
    location: "Oran",
    adopted: false,
  },
  {
    name: "Sam",
    image: "images/Sam-bird.jpg",
    type: "BIRD",
    race: "bird-race-3",
    location: "Jijel",
    adopted: false,
  },
  {
    name: "Wish",
    image: "images/Wish-cat.jpg",
    type: "CAT",
    race: "cat-race-1",
    location: "Sitif",
    adopted: false,
  },
];
function App() {
  const [pets, setPets] = useState(allPets);
  // const [selectRace, setSlectRace] = useState(false);
  const [selectedRace, setSlectedRace] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation,setSelectedLocation] = useState('All')
  const [races, setRaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [locations,setLocations] = useState([])
  const [search,setSearch] = useState('')
  const [modle,setModle] =useState(false)
  useEffect(() => {
    const tempRaces = ["All"];
    const tempTypes = ["All"];
    const tempLocations = ['All']
    allPets.forEach((pet) => {
      if (selectedType === "All") {
        if (!tempTypes.includes(pet.type)) tempTypes.push(pet.type);
        if (!tempRaces.includes(pet.race)) tempRaces.push(pet.race);
      } else {
        if (!tempTypes.includes(pet.type)) tempTypes.push(pet.type);
        if (pet.type === selectedType) {
          if (!tempRaces.includes(pet.race)) tempRaces.push(pet.race);
        }
      }
      if(!tempLocations.includes(pet.location)) tempLocations.push(pet.location)
    });
    setRaces(tempRaces);
    setTypes(tempTypes);
    setLocations(tempLocations)
  }, [selectedType]);
  const selectedTypeHandler = (type) => {
    setSelectedType(type);
  };
  const selectedRaceHandler = (race) => {
    setSlectedRace(race);
  };
  const selectedLocationHandler = (location) => {
    setSelectedLocation(location);
  };
  

  const filterList = () => {
    let tempPets =[...allPets]
      setPets(tempPets.filter((pet)=>{
        return(
          (pet.type === selectedType || selectedType === 'All')&&
          (pet.race === selectedRace || selectedRace === 'All')&&
          pet.name.toLowerCase().includes(search.toLowerCase())&&
          (pet.location === selectedLocation || selectedLocation === "All")
        )
      }))
  };
useEffect(() => {
  filterList()
},[selectedRace,selectedType,search,selectedLocation])

  useEffect(() => {
    document.body.style.overflowY = modle ? "hidden" : 'auto';
  },[modle])

  const submiteHandler = ()=>{
    setModle(false)
  }
  return (
    <div className="App">
      {modle && <div className="modle">
        <ContactForm onsubmite={submiteHandler}/>
        </div>}
      <div className="head">
        <div className="firstpart">
        <div className="logo">
          <img src="images/logo-pets.jpg"></img>
        </div>
      <h1>Find your self a pet</h1>
        </div>
      <button onClick={()=>{
        setModle(!modle)
        }}>Contact Us</button>
      </div>
      <div className="navbar">
        <div className="filters">
          <DropDown
            onslect={selectedTypeHandler}
            filter={filterList}
            options={types}
          ></DropDown>
          <DropDown
            onslect={selectedRaceHandler}
            options={races}
          ></DropDown>
          <DropDown
            onslect={selectedLocationHandler}
            options={locations}
          ></DropDown>
        </div>
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="search" placeholder="Search by name..."></input>
      </div>
      <div className="content">
        {pets.map((pet, index) => {
          return (
            <Card
              name={pet.name}
              image={pet.image}
              type={pet.type}
              race={pet.race}
              location={pet.location}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

function DropDown(props) {
  const [openMenu, setopenMenu] = useState(false);
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (!selected || !props.options.includes(selected))
      setSelected(props.options[0]);
  }, [props.options, selected]);

  return (
    <div
      onClick={() => {
        setopenMenu(!openMenu);
      }}
      className="dropdown"
    >
      <div>
        {selected}
        {(openMenu && <ChevronUp />) || <ChevronDown />}
      </div>
      {openMenu && (
        <div className="items">
          {props.options.map((option, index) => {
            return (
              <div
                onClick={() => {
                  setSelected(option);
                  props.onslect(option);
                }}
                className="item"
                key={option + index}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function ContactForm (props){
  const[text, setText]=useState('')
  const[email,setEmail]=useState('')

  return(
    <form onSubmit={(e)=>{
      e.preventDefault;
      setText('')
      setEmail('')
      props.onsubmite()
    }}>
      <textarea onChange={(e)=>{setText(e.target.value)}} value={text} placeholder="Enter your message"></textarea>
      <input onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Eter your email" type={'email'}/>
      <button type="Submite">Send</button><button type="Submite">Close</button>
    </form>
  )
}