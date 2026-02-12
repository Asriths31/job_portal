// App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import { jobs } from './mockData'
import JobCard from './comp/Card'
import { FaSortAlphaUp } from "react-icons/fa";


function App() {
  const [searchInput, setSearchInput] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const[isSort,setIsSort]=useState(false)
  const[filteredJobs,setFilteredJobs]=useState([])


  const locations = ["all", ...new Set(jobs.map(job => job.location))]
  const jobTypes = ["all", ...new Set(jobs.map(job => job.type))]

   useEffect(()=>{
    setFilteredJobs(jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchInput.toLowerCase())
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation
      const matchesType = selectedType === "all" || job.type === selectedType

      return matchesSearch && matchesLocation && matchesType
    }
    )
    )
   }, [searchInput, selectedLocation, selectedType])

  console.log({isSort,filteredJobs})

  // useEffect(()=>{
  //     if(isSort){
  //       setFilteredJobs(prev=>prev.sort((a,b)=>{
  //        const val1=a.title.toLocaleLowerCase()
  //        const val2=b.title.toLocaleLowerCase()

  //        if(val1<val2){
  //         return -1
  //        }
  //        if (val2 > val1) {
  //           return 1;
  //       }
  //       return 0;
  //       }))
  //     }
  //     else {
  //       setFilteredJobs(jobs)
  //     }

  // },[isSort])

  return (
    <div className='main-body'>

      <div className='filters-section'>
       <div className='search-div'>
          <input 
            type='text'
            placeholder='Search jobs by title...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className='filter-controls'>
          <div className='filter-group'>
            <label>Location:</label>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label>Job Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>

          {/* <div 
          className='filter-sort'
          onClick={()=>setIsSort(prev=>!prev)}
          >
            <label>Sort</label>
            <FaSortAlphaUp />
          </div> */}
        </div>
      </div>
      <div className='jobs-div'>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard 
              job={job}
            />
          ))
        ) : (
          <div className='no-results'>
            <p>No jobs found matching your criteria</p>
            <button onClick={() => {
              setSearchInput("")
              setSelectedLocation("all")
              setSelectedType("all")
            }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App