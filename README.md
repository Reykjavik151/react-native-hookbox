# react-native-hookbox

Outstanding set of the most powerful React Hooks!

## Installation

```sh
yarn add react-native-hookbox
```

## Usage

### useAppState

Detects the current state of the app through the AppState API from ReactNativeCore.
The current app states: "active" | "background" | "inactive" | "unknown" | "extension"

```ts
import { useAppState } from 'react-native-hookbox';

// ...

const appState = useAppState();

useEffect(() => {
  if (appState === 'active') {
    // ...
  }
}, [appState]);
```

### useAsync

Async wrapper for async/await functions with Promise return.

```ts
// file1 (API or something)
const someAsyncFn = async () => 'async data';

// file2 (Component)
import { useAsync } from 'react-native-hookbox';

// ...

const { data, error, isLoading } = useAsync(someAsyncFn);

useEffect(() => {
  console.log('new data:', data);
}, [data]);

useEffect(() => {
  console.log('error:', error);
}, [error]);

// usage of 'isLoading' if you need
```

### useCached

Returns the cached non-empty value of the current value.
Do not consider any `null`, `undefined` and `NaN` values (or similar).

```ts
import { useCached } from 'react-native-hookbox';

// ...

const [state, setState] = useState(0);
const cachedState = useCached(state);

// state: 0, cachedState: 0
// state: 1, cachedState: 1,
// state: 2, cachedState: 2,
// state: undefined, cachedState: 2,
// state: null, cachedState 2,
// state: 10, cachedState: 10,
// state: 11, cachedState: 11,
// ...
```

### useDebouncedValue

A bit delayed value of the state.
If the state changes, the timer is reset.

```ts
import { useDebouncedValue } from 'react-native-hookbox';

// ...

const [state, setState] = useState(0);
const debouncedState = useDebouncedValue(state, 1000);

// ...
```

### useDeepCompareEffect

useEffect with deep comparison of dependencies instead of shalow comparison by the default.

```ts
import { useDeepCompareEffect } from 'react-native-hookbox';

// ...

const [state, setState] = useState({ name: 'John' });

// ...

useDeepCompareEffect(() => {
  console.log('state has been updated (even if not a link for object)');
}, [state]);

// ...

// The same link for object, but another properties inside
setState(prev => {
  prev.name = 'Roman';
  return prev;
});

// It will trigger the deepCompareEffect above
```

### useDeviceOrientation

Detects the current orientation of the device.

```ts
import { useDeviceOrientation } from 'react-native-hookbox';

// ...

const orientation = useDeviceOrientation();

useEffect(() => {
  if (orientation === 'portrait') {
    // Portrait mode
    // ...
  } else {
    // Landscape mode
    // ...
  }
}, [orientation]);
```

### useFetch

Fetch data from an API

```ts
import { useFetch } from 'react-native-hookbox;

// ...

const MyComponent = () => {
 const [data, loading, error] = useFetch('https://jsonplaceholder.typicode.com/todos/1', {});

 // ...
};
```

### useKeyboardListeners

```ts
import { useKeyboardListeners } from 'react-native-hookbox';

// ...

const onKeyboardShow = useCallback(() => {
  // ...
}, []);

const onKeyboardHide = useCallback(() => {
  // ...
}, []);

useKeyboardListeners(onKeyboardShow, onKeyboardHide);
```

### useMount

useEffect with an empty dependency array.

```ts
import { useMount } from 'react-native-hookbox';

// ...

useMount(() => {
  console.log('component has been mounted');
});
```

### usePrevious

Returns the previous value in the previous render iteration.

```ts
import { usePrevious } from 'react-native-hookbox';

// ...

const [state, setState] = useState(0);
const prevState = usePrevious(state);

// state: 0, prevState: undefined
// state: 1, prevState: 0,
// state: 2, prevState: 1,
// state: 0, prevState: 2,
// ...
```

### useSpecificKeyExtractor

```tsx
import { useSpecificKeyExtractor } from 'react-native-hookbox';

// ...

// 'some-data-element' is a just prefix for a convenient debugging when you check nodes in React DevTools
// 'id' should be included in 'SomeDataType'
const keyExtractor = useSpecificKeyExtractor<SomeDataType>('some-data-element', 'id');

return (
  <FlatList
    data={data}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
);

// ...
```

### useStateWithCached

Combines useState and useCached hooks.

```ts
import { useStateWithCached } from 'react-native-hookbox';

// ...

const [state, setState, cachedState] = useStateWithCached(0);

// state: 0, cachedState: 0
// state: 1, cachedState: 1,
// state: 2, cachedState: 2,
// state: null, cachedState: 2,
// state: 4, cachedState: 4,
// state: undefined, cachedState: 4,
// state: 6, cachedState: 6,
// state: 7, cachedState: 7,
```

### useStateWithPrevious

Combines useState and usePrevious hooks.

```ts
import { useStateWithPrevious } from 'react-native-hookbox';

// ...

const [state, setState, prevState] = useStateWithPrevious(0);

// state: 0, prevState: undefined
// state: 1, prevState: 0,
// state: 2, prevState: 1,
// state: 0, prevState: 2,
```

### useStateWithValidation

Validate the state value when it updates and return the boolean value of passed / failed validation as third param of the output array.

```ts
export { useStateWithValidation } from 'react-native-hookbox';

// ...

const [state, setState, isValid] = useStateWithValidation(0, value => value > 0);

// state: 0, isValid: false
// setState(1)
// state: 1, isValid: true,
// setState(-1)
// state: -1, isValid: false,
// setState(10)
// state: 10, isValid: true,
```

### useToggle

Extended useState for boolean values.
Return `[value, toggleValue]` array.

```ts
import { useToggle } from 'react-native-hookbox';

// ...

const [value, toggleValue] = useToggle(false);

// ...
const onPress = () => {
  toggleValue();
};

// onPress() -> value: true
// onPress() -> value: false
// onPress() -> value: true
// ...
```

### useUpdateEffect

useEffect that does not run on the first render.

```ts
import { useUpdateEffect } from 'react-native-hookbox';

// ...

const [counter, setCounter] = useState(0);

// only after new value appears
// shouldn't be called with counter === 0
useUpdateEffect(() => {
  console.log('counter has been updated');
}, [counter]);

// setCounter(1) -> 'counter has been updated' in the console
```

### useVibration

Vibrate the device.

```ts
import { useVibration } from 'react-native-hookbox';

// ...

const { vibrate, cancelViration } = useVibration();

const SomeComponent = () => {
  const { vibrate, cancelVibration } = useVibration();

  const onVibratePress = () => {
    // Vibrate for 500 milliseconds
    vibrate(500);
  };

  return (
    <View>
      <TouchableOpacity onPress={onVibratePress}>
        <Text>Vibrate Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelVibration}>
        <Text>Cancel Vibration</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
