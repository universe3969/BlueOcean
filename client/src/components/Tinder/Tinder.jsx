import React, { useState, useEffect } from 'react'
import './Tinder.scss';
import Draggable from 'react-draggable';
import axios from 'axios';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import ReactSelect from 'react-select';
const Tinder = () => {
const [position, setPosition] = useState(0);
const [yPosition, setYPosition] = useState(0);
const [bookPile, setBookPile] = useState([
  {
    "title": "The Hunger Games",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg",
    "author": "Suzanne Collins",
    "pageCount": 374,
    "date": "September 14, 2008",
    "genre": [
      "Young Adult",
      "Fiction",
      "Dystopia",
      "Fantasy",
      "Science Fiction",
      "Romance",
      "Adventure"
    ],
    "summary": "Could you survive on your own in the wild, with every one out to make sure you don't live to see the morning? In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love."
  },
  {
    "title": "The Book Thief",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg",
    "author": "Markus Zusak",
    "pageCount": 552,
    "date": "March 1, 2006",
    "genre": [
      "Historical Fiction",
      "Fiction",
      "Young Adult",
      "Historical",
      "Classics",
      "War",
      "Holocaust"
    ],
    "summary": "Librarian's note: An alternate cover edition can be found here It is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will be busier still. By her brother's graveside, Liesel's life is changed when she picks up a single object, partially hidden in the snow. It is The Gravedigger's Handbook, left behind there by accident, and it is her first act of book thievery. So begins a love affair with books and words, as Liesel, with the help of her accordian-playing foster father, learns to read. Soon she is stealing books from Nazi book-burnings, the mayor's wife's library, wherever there are books to be found. But these are dangerous times. When Liesel's foster family hides a Jew in their basement, Liesel's world is both opened up, and closed down. In superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time. (Note: this title was not published as YA fiction)"
  },
  {
    "title": "The Kite Runner",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
    "author": "Khaled Hosseini",
    "pageCount": 371,
    "date": "January 1, 2003",
    "genre": [
      "Fiction",
      "Historical Fiction",
      "Classics",
      "Contemporary",
      "Novels",
      "Historical",
      "Literature"
    ],
    "summary": "1970s Afghanistan: Twelve-year-old Amir is desperate to win the local kite-fighting tournament and his loyal friend Hassan promises to help him. But neither of the boys can foresee what would happen to Hassan that afternoon, an event that is to shatter their lives. After the Russians invade and the family is forced to flee to America, Amir realises that one day he must return to an Afghanistan under Taliban rule to find the one thing that his new world cannot grant him: redemption."
  },
  {
    "title": "Harry Potter and the Philosopher's Stone",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg",
    "author": "J.K. Rowling",
    "pageCount": 223,
    "date": "June 26, 1997",
    "genre": [
      "Fantasy",
      "Fiction",
      "Young Adult",
      "Magic",
      "Childrens",
      "Middle Grade",
      "Classics"
    ],
    "summary": "Harry Potter thinks he is an ordinary boy - until he is rescued by an owl, taken to Hogwarts School of Witchcraft and Wizardry, learns to play Quidditch and does battle in a deadly duel. The Reason ... HARRY POTTER IS A WIZARD!"
  },
  {
    "title": "Water for Elephants",
    "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1667708346i/43641.jpg",
    "author": "Sara Gruen",
    "pageCount": 368,
    "date": "May 22, 2006",
    "genre": [
      "Fiction",
      "Historical Fiction",
      "Romance",
      "Historical",
      "Adult",
      "Adult Fiction",
      "Contemporary"
    ],
    "summary": "When Jacob Jankowski, recently orphaned and suddenly adrift, jumps onto a passing train, he enters a world of freaks, drifters, and misfits, a second-rate circus struggling to survive during the Great Depression, making one-night stands in town after endless town. A veterinary student who almost earned his degree, Jacob is put in charge of caring for the circus menagerie. It is there that he meets Marlena, the beautiful young star of the equestrian act, who is married to August, the charismatic but twisted animal trainer. He also meets Rosie, an elephant who seems untrainable until he discovers a way to reach her.  Beautifully written, Water for Elephants is illuminated by a wonderful sense of time and place. It tells a story of a love between two people that overcomes incredible odds in a world in which even love is a luxury that few can afford."
  }
]);
const [bookPosition, setBookPosition] = useState(0)
const [selectedOptions, setSelectedOptions] = useState([]);
const [availableOptions, setAvailableOptions] = useState([
  {value: 'apple', label: 'apple'}
])
const [booksGenres, setBooksGenres] = useState([]);
const [trigger, setTrigger] = useState([]);
const [allBooks, setAllBooks] = useState([]);
useEffect(() => {
  axios.get('http://localhost:3000/explore/')
  .then((data) => {
    console.log('setting allBooks to this,', data.data.rows);
    setAllBooks(data.data.rows);
    setBookPile(data.data.rows);
    axios.get('http://localhost:3000/explore/genre-options')
    .then((data) => {
      console.log('this is genre data', data.data.rows);
      var optionsArray = [];
      data.data.rows.forEach((genre) => {
        let optionObject = {
          value: genre.genre,
          label: genre.genre
        }
        // console.log('this is the single option', optionObject)
        optionsArray.push(optionObject);
      })
      // console.log('this is the options array');
      setAvailableOptions(optionsArray);
      setTrigger([1]);
    })
    .catch((err) => {
      console.log('axios error acquiring options', err);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}, [])
  //UPDATE THE OPACITY AND ROTATE CSS VARIABLE BASED ON THE DRAGGABLE COMPONENT'S POSITIONING
  const opacity = 1 - (Math.abs(position) / 400);
  const rotate = `${((position / 300) * 20)}deg`;
  // USER CLICKED THE X BUTTON
  const swipeLeft = () => {
    if (bookPosition < bookPile.length-2) {
      setBookPosition(bookPosition+1)
    }
  }
  //USER CLICKED THE CHECK BUTTON
  const swipeRight = () => {
    if (bookPosition < bookPile.length-2) {
      setBookPosition(bookPosition+1)
    }
    //ADD BOOK TO COLLECTION
  }
  useEffect(() => {
    if (trigger.length) {
    axios.post('http://localhost:3000/explore/genres', {selectedOptions})
    .then((data) => {
      console.log('filtered books', data.data)
      console.log('this is all books state', allBooks)
      if (selectedOptions.length) {
        setBookPile(data.data);
        setBookPosition(0);
        console.log('inside the if statement switching to this,', data.data)
      } else {
        setBookPile(allBooks);
        setBookPosition(0);
      }
    })
  }
  }, [selectedOptions])
  return (
    <div className="tinder">
      <div className="center-container">
    <Draggable
      bounds={{ left: -400, right: 400, top: 0, bottom: 300}}
      position={{ x: position, y: yPosition }}
      on
      onDrag={(e, data) => {
        setPosition(data.x);
        setYPosition(data.y);
        // console.log(data.x);
        // console.log('this is rotate', rotate);
      }}
      onStop={(e, data) => {
        setPosition(data.x);
        setYPosition(data.y);
        console.log(data.x);
        if (data.x > 275) {
          console.log('book swiped right')
          setPosition(0);
          setYPosition(0);
          //ADD BOOK TO COLLECTION
          //THIS IF STATEMENT PREVENTS USER FROM TRYING TO ACCESS AN INDEX THAT DOESN'T EXIST
          if (bookPosition < bookPile.length-2) {
            console.log('changing book position', bookPosition, bookPile.length);
            setBookPosition(bookPosition+1)
          }
        }
        if (data.x < -275) {
          console.log('book swiped left')
          setPosition(0);
          setYPosition(0);
          if (bookPosition < bookPile.length-2) {
            console.log('changing book position', bookPosition, bookPile.length);
            setBookPosition(bookPosition+1)
          }
        }
        if (Math.abs(data.x) < 275) {
          setPosition(0);
          setYPosition(0);
        }
      }}
    >
      {/* <div className="book-container"> */}
      <img src={bookPile[bookPosition].cover_image} className="draggable-component tinder-card" style={{'--opacity': opacity, '--rotate': rotate}}/>
      {/* </div> */}
    </Draggable>
    <img src={bookPile[bookPosition+1].cover_image} className="back-book" />
    <div className='lower-box'>
      <div className='x' onClick={swipeLeft}>
        <MdCancel/>
      </div>
      <div className='small-title'>
        {bookPile[bookPosition].title}
        <div className='author-name'>
          {bookPile[bookPosition].author}
        </div>
      </div>
      <div className='check' onClick={swipeRight}>
        <BsFillCheckCircleFill/>
      </div>
    </div>
      </div>
      <div className="data-container">
        <div className='synopsis'>
          <div className='synopsis-title'>
            Synopsis
          </div>
          <div className='synopsis-body'>
            {bookPile[bookPosition].description}
          </div>
          <div className='price'>
            Price: {`$${bookPile[bookPosition].price}`}
          </div>
        </div>
        <div className="filter-container">
          <div className='filter-title'>
            Filter Genres
          </div>
        <ReactSelect
          options={availableOptions}
          value={selectedOptions}
          onChange={setSelectedOptions}
          isMulti={true}
          isSearchable={true}
        />
      </div>
      </div>
    </div>
  )
}
export default Tinder