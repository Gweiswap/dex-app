import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 80 80" {...props}>
      <defs>
        <image
          width="80"
          height="80"
          id="logo-svg"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAAXNSR0IB2cksfwAAAnZQTFRFAAAAHx8fLy8vW1tbfHx8nZ2dvLy80tLS4eHh8fHx////nJycWlpaa2trrKys3t7eSUlJn5+f7u7uRERETU1NtbW1/f39tLS0R0dHVFRUwsLCu7u7KCgok5OT+fn5kZGRJSUlRUVF4ODgenp69/f3eXl5ICAgoKCgISEhlpaWgYGBWFhYMzMz6+vr6urqNDQ0xsbGxMTEkpuXUmhgU2dgfoyHNzc39PT0d4J+O2NWUGZevb29d4N/WWplurq6/v7+eYWBOmNWWWxlQUFBs7Ozg42KY3RuNjY2+/v7cX56j4+POl9TPWFVc4B74uLiPGNWPllQpa+sSGFZPGJVPWJWcn97V1dXP1pQn6Cfe4mEQWBWOWNWc4F8UFBQnZ6eant2QmNYc3151tbWRmBXSF9YR2BYR19YRmBWWGdjrbWyTGBZSGBYjJGPLCwsO2JVZ3dx+vv7X19fPGFUiIiIdoB8cX96hIuIcoF8/P39ysrK3d3d8vLybnx2SWFZR19XSWBZSWBYS2JbTWJbTmRdTmVdUWZfUGdfXW9ok5uYUmVfUWdfUGVdmZ+daHdyPWJVyM3LWWpkP2FVl5+dXGxnPWNWQlpSoqakZXdxRGJXO2NVPGRWPVlQgY+KR2FZl5+caHdxP2NXOV9SP2JWW2xmO2JUPWRWO2FUZGRkX29qP2NYi5OQPmNWl56cgo2KR2VbSWZcRmJZQ2BXP1xTQF1TQV5VQV9VQF9VQV9WQV5Ul52bY3JtPGJWXG1oXnFrNTU1YHJsTk5OYXJsQEBAXnFqtra2YXJtPGFVY3NuxcXFaXt1YnNueIB9qampg4ODTExMPj4+PT09QkJCAt9sWAAAANJ0Uk5TAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QCLmkQAABANJREFUeJyt2Hdf00AcB2CLFuGAOoCKshyITHGCQaVWrQNH1Tpw4MAtUhWcKO496t574UAUxT1QnKi43pFtr0kut3Kpfv/gkya/PFwvzeVyLVrwYyKic4Ix7J9QNhcMydcMmyKcAVJ7UkjLVubQ1mHhIDysdWhEq8gQwyRaH2VpA/C0sUQZEtXatu3aExpMe3O0qKhyMbFWBueLtUOcEKkUdezE0WDiY/RFuSIhMUnXAyApubOOKHtdugpwvnTtwhVlr1uKoAdASneOGDiU2kOY88XMFGXPYsjjiEF6XjGNCgb+T7phD4B0WhMDXkYQHgAZFBHuyuTdHOxYIwkQelnZQXkA9MzBROil9QrSA6A3dmHoHdinbz9u+iO1GRoQerl5GDhA4icfqc3LRUUIDsS/xyAdcDBaXICA0Iux4eAQOx8cihbbhqkiBIcTPe3QaeEITbUFA0eOMgyO1lSPypVB2MBCwqODY8Yqm+O05YVyE+GgMF4MdE6YOMklTfZvT9GWh6Wi4FTSo7dwGiiaPmOmX5yF1RejIG2UYYAAzJ4z17c5D6tPhyDswhIGOHb+goWLlCxcsHiJ/9DSZaWlpcux+hLYif6/ZcSPEILuFUXafSspdXKsISq4ilbgcJZP55xPZpUKVtCOr3avMeSBChWkPknWrltvDLSo4AZjZzKyQQUr/wtYqYLBjv3aZKugyNxIPxtVkFu3qapq85at27bvyN+5a/ce/669+/bvP3AQL0wSa+EhDzI2SBO8ew4fOerddh/jgJw+PH4C9aST4NTpM/4PZwkwW+Aq21ac0w4O5y9cdEp232jjvoQXI1eZ+Tu8fAUbD69ekzdJEPkdMuZctuseiZkbBIjcKdR72Xs9brI9qZoAkXv5FtW7fYfjUUBktAmhTbvu1vA8qfoe3kFlyJDNGrHVq6FseEMHS9BnipkC1iJezf0HdXV1Dx95U19f//jJ08fPnr/A6tNRsJjTQrtTcr+kPSOwaJ56qWFs8JXkeS0wtR0vP5ehWMhpoeeNPheYOahzmwY26Hor4oEGBYQic/blGUo5m4xF9SD4juh2CLoahTzbexw0FVBB5wchD3w0ISAUiTm2w+60uz6JeXm5qMd4C3A4pc9fxDzsLUAWm/AWur4Kek2YFxBzemqqasu/CXrZWbgXaGKkpux7o8D95os1k2ggtRtjBT2iA1Ex+Pdl3JPfmJsNe810T3klNSr2SGWBskgbazmeiekp3/oH+VLFSko3nqeIP42uLLE8RUxIFlr7SkzQ89Tlql/xut7A3yZ9DyFjuKQ1Nk6MQ0RTtJm5wtnuj0nY0yzC6q7Binha0rdKHKGsEpu1q8SCHGHSY0QTIA1zfDIojoXqnPAXkOKPtd8OSA4AAAAASUVORK5CYII="
        />
      </defs>
      <use id="Background" href="#logo-svg" x="0" y="0" />
    </Svg>
  );
};

export default Icon;
