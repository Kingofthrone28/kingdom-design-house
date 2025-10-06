# VideoPlayer Component

A flexible and customizable video player component for React applications that supports MP4 videos with custom controls, loading states, and error handling.

## Features

- 🎥 **MP4 Video Support** - Native support for MP4 video files
- 🎮 **Custom Controls** - Optional custom play/pause controls
- 📱 **Responsive Design** - Works on all device sizes
- ⚡ **Loading States** - Built-in loading spinner and states
- 🛠️ **Error Handling** - Graceful error handling with retry functionality
- 🎨 **Customizable Styling** - SCSS modules for easy customization
- ♿ **Accessibility** - Keyboard navigation and ARIA labels
- 📐 **Aspect Ratios** - Multiple aspect ratio options

## Basic Usage

```jsx
import VideoPlayer from '../components/Organisms/VideoPlayer';

<VideoPlayer
  src="/videos/your-video.mp4"
  poster="/images/poster.jpg"
  controls={true}
  className="videoPlayer--16-9"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | **Required.** URL to the MP4 video file |
| `poster` | string | - | URL to the poster image displayed before video loads |
| `autoplay` | boolean | false | Whether the video should autoplay |
| `loop` | boolean | false | Whether the video should loop |
| `muted` | boolean | false | Whether the video should be muted |
| `controls` | boolean | true | Whether to show native video controls |
| `className` | string | '' | Additional CSS classes |
| `width` | string | '100%' | Width of the video player |
| `height` | string | 'auto' | Height of the video player |
| `onPlay` | function | - | Callback when video starts playing |
| `onPause` | function | - | Callback when video is paused |
| `onEnded` | function | - | Callback when video ends |
| `onError` | function | - | Callback when video encounters an error |

## Aspect Ratio Classes

Use these classes to set specific aspect ratios:

- `videoPlayer--16-9` - 16:9 aspect ratio (widescreen)
- `videoPlayer--4-3` - 4:3 aspect ratio (standard)
- `videoPlayer--1-1` - 1:1 aspect ratio (square)
- `videoPlayer--square` - Alias for 1:1
- `videoPlayer--wide` - 21:9 aspect ratio (ultra-wide)

## Examples

### Basic Video Player
```jsx
<VideoPlayer
  src="/videos/demo.mp4"
  poster="/images/demo-poster.jpg"
  controls={true}
  className="videoPlayer--16-9"
/>
```

### Custom Controls Video
```jsx
<VideoPlayer
  src="/videos/demo.mp4"
  poster="/images/demo-poster.jpg"
  controls={false}
  autoplay={false}
  loop={true}
  onPlay={() => console.log('Video started')}
  onPause={() => console.log('Video paused')}
  onEnded={() => console.log('Video ended')}
  onError={(error) => console.error('Video error:', error)}
/>
```

### Square Format Video
```jsx
<VideoPlayer
  src="/videos/square-demo.mp4"
  poster="/images/square-poster.jpg"
  controls={true}
  className="videoPlayer--1-1"
  width="300px"
  height="300px"
/>
```

## VideoShowcase Component

The `VideoShowcase` component demonstrates how to use multiple `VideoPlayer` components in a grid layout for showcasing work or portfolio content.

### Usage
```jsx
import VideoShowcase from '../components/Organisms/VideoShowcase';

<VideoShowcase />
```

## Styling

The component uses SCSS modules for styling. You can customize the appearance by modifying the `VideoPlayer.module.scss` file or by passing custom CSS classes.

### Key CSS Classes
- `.videoPlayer` - Main container
- `.videoPlayer__video` - Video element
- `.videoPlayer__overlay` - Custom controls overlay
- `.videoPlayer__playButton` - Play/pause button
- `.videoPlayer__loading` - Loading state container
- `.videoPlayer__error` - Error state container

## Accessibility

The component includes several accessibility features:

- Keyboard navigation (Space/Enter to play/pause)
- ARIA labels for screen readers
- Focus management
- High contrast support

## Browser Support

- Chrome 4+
- Firefox 3.5+
- Safari 3.2+
- Edge 12+
- Internet Explorer 9+

## File Structure

```
components/Organisms/
├── VideoPlayer.js              # Main video player component
├── VideoPlayer.module.scss     # Styles for VideoPlayer
├── VideoShowcase.js            # Showcase component
├── VideoShowcase.module.scss   # Styles for VideoShowcase
└── README.md                   # This documentation
```

## Demo Page

Visit `/video-demo` to see the VideoPlayer component in action with various examples and usage patterns.
