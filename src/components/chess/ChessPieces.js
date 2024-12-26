export const ChessPieces = {
  white: {
    king: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>
        <g fill="url(#whiteGradient)" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6" strokeLinejoin="miter"/>
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"/>
          <path d="M20 8h5" strokeLinejoin="miter"/>
          <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/>
        </g>
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f0abfc" />
          </linearGradient>
        </defs>
        <g fill="url(#whiteGradient)" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM16 8.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM33 9a2 2 0 1 1-4 0 2 2 0 1 1 4 0z"/>
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z" strokeLinecap="butt"/>
          <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" strokeLinecap="butt"/>
          <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/>
        </g>
      </svg>
    ),
    // Add other pieces with similar gradient styling...
  },
  black: {
    king: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#701a75" />
          </linearGradient>
        </defs>
        <g fill="url(#blackGradient)" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6" strokeLinejoin="miter"/>
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"/>
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"/>
          <path d="M20 8h5" strokeLinejoin="miter"/>
          <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"/>
        </g>
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#701a75" />
          </linearGradient>
        </defs>
        <g fill="url(#blackGradient)" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="none">
            <circle cx="6" cy="12" r="2.75"/>
            <circle cx="14" cy="9" r="2.75"/>
            <circle cx="22.5" cy="8" r="2.75"/>
            <circle cx="31" cy="9" r="2.75"/>
            <circle cx="39" cy="12" r="2.75"/>
          </g>
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z" strokeLinecap="butt"/>
          <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" strokeLinecap="butt"/>
          <path d="M11 38.5a35 35 1 0 0 23 0" fill="none" strokeLinecap="butt"/>
          <path d="M11 29a35 35 1 0 1 23 0m-21.5 2.5a35 35 1 0 0 20 0m-21 3a35 35 1 0 0 22 0" fill="none"/>
        </g>
      </svg>
    ),
    // Add other pieces with similar gradient styling...
  }
};

export const initialBoardSetup = {
  // Black pieces
  '0,0': { type: 'rook', color: 'black' },
  '1,0': { type: 'knight', color: 'black' },
  '2,0': { type: 'bishop', color: 'black' },
  '3,0': { type: 'queen', color: 'black' },
  '4,0': { type: 'king', color: 'black' },
  '5,0': { type: 'bishop', color: 'black' },
  '6,0': { type: 'knight', color: 'black' },
  '7,0': { type: 'rook', color: 'black' },
  '0,1': { type: 'pawn', color: 'black' },
  '1,1': { type: 'pawn', color: 'black' },
  '2,1': { type: 'pawn', color: 'black' },
  '3,1': { type: 'pawn', color: 'black' },
  '4,1': { type: 'pawn', color: 'black' },
  '5,1': { type: 'pawn', color: 'black' },
  '6,1': { type: 'pawn', color: 'black' },
  '7,1': { type: 'pawn', color: 'black' },

  // White pieces
  '0,7': { type: 'rook', color: 'white' },
  '1,7': { type: 'knight', color: 'white' },
  '2,7': { type: 'bishop', color: 'white' },
  '3,7': { type: 'queen', color: 'white' },
  '4,7': { type: 'king', color: 'white' },
  '5,7': { type: 'bishop', color: 'white' },
  '6,7': { type: 'knight', color: 'white' },
  '7,7': { type: 'rook', color: 'white' },
  '0,6': { type: 'pawn', color: 'white' },
  '1,6': { type: 'pawn', color: 'white' },
  '2,6': { type: 'pawn', color: 'white' },
  '3,6': { type: 'pawn', color: 'white' },
  '4,6': { type: 'pawn', color: 'white' },
  '5,6': { type: 'pawn', color: 'white' },
  '6,6': { type: 'pawn', color: 'white' },
  '7,6': { type: 'pawn', color: 'white' }
}; 