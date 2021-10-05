import React, { useRef, useEffect, forwardRef } from "react";

const VideoBox = forwardRef(({ onChange }, ref) => {
  const video = useRef(ref);

  useEffect(() => {
    const events = ["play", "seeked", "pause"];

    // video.current = { ...video.current, events };
    const videoElm = video.current;
    // const videoElm = ref.current;
    // console.log({ videoElm });
    events.map((e) => {
      videoElm.addEventListener(e, () => updateEvent(e));
    });

    return () => {
      events.map((e) => {
        videoElm.removeEventListener(e, () => updateEvent(e));
      });
    };
  }, []);
  const updateEvent = (event) => {
    const {
      duration,
      playing,
      currentTime,
      src,
      currentSrc,
      muted,
      paused,
      volume,
      // } = ref.current;
    } = video.current;
    const eventObject = {
      event,
      duration,
      playing,
      currentTime,
      src,
      currentSrc,
      muted,
      paused,
      volume,
    };
    console.log(eventObject);
    onChange && onChange(eventObject);
  };
  // const events = {
  //   onPlay: updateEvent("play"),
  //   onPlaying: updateEvent("plaplaying"),
  //   onPause: updateEvent("pause"),
  // };
  return (
    <div className="videobox ">
      <video
        ref={video}
        // ref={ref}
        // {...events}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
      ></video>
    </div>
  );
});
export default VideoBox;
// export default logProps(VideoBox);

// function logProps(Component) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log("old props:", prevProps);
//       console.log("new props:", this.props);
//     }

//     render() {
//       const { forwardedRef, ...rest } = this.props;

//       // Assign the custom prop "forwardedRef" as a ref
//       return <Component ref={forwardedRef} {...rest} />;
//     }
//   }

//   // Note the second param "ref" provided by React.forwardRef.
//   // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
//   // And it can then be attached to the Component.
//   return React.forwardRef((props, ref) => {
//     return <LogProps {...props} forwardedRef={ref} />;
//   });
// }
