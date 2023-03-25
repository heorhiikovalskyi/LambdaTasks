interface Array<T> {
  /**
   * Returns true if all elements match the given predicate. If there no elements in array, returns true.
   * @param predicate - checks if array element match some condition
   */
  all(predicate: (value: T) => boolean): boolean;
  /**
   * Returns true if at least one element matches the given predicate. If there no elements in array, returns false
   * @param predicate  - checks if array element match some condition
   */
  any(predicate: (value: T) => boolean): boolean;
  /**
   * Returns a Map containing the values provided by valueTransform and indexed by keySelector functions applied to elements of the given array.
   * @param keySelector - takes array element as argument and forms map key
   * @param valueTransform - takes array element as argument and forms map value
   */
  associateBy<K, V>(
    keySelector: (value: T) => K,
    valueTransform: (value: T) => V
  ): Map<K, V>;
  /**
   * Returns average of all numbers in array. If there no numbers in array, returns undefined
   */
  average(): number | undefined;
  /**
   * Splits this array into several arrays each not exceeding the given size and applies the given transform function to an each.
   * @param size - the number of elements to take in each array, must be positive and can be greater than the number of elements in this sequence.
   * @param transform - transforms every array in resulting array
   * @returns array of results of the transform applied to an each array
   */
  chunked<R>(size: number, transform: (array: T[]) => R): R[];
  /**
   * Returns an array containing only elements from the given array having distinct keys returned by the given selector function.
   * Among elements of the given array with equal keys, only the first one will be present in the resulting array. The elements in the resulting array are in the same order as they were in the source array.
   * @param selector - takes array element as argument and forms corresponding key
   */
  distinctBy<K>(selector: (value: T) => K): T[];
  /**
   * Returns an array containing only elements matching the given filter.
   * @param filter - checks if array element matches some condition
   */
  filter_(filter: (element: T) => boolean): T[];
  /**
   * Returns an array containing only elements matching the given filter.
   * @param filter - function that takes the index of an element and the element itself and returns the result of filter evaluation on the element.
   */
  filterIndexed(filter: (element: T, index: number) => boolean): T[];
  /**
   * Returns an array containing all elements not matching the given predicate.
   * @param predicate - checks if array element matches some condition.
   */
  filterNot(predicate: (value: T) => boolean): T[];
  /**
   * Returns the first element matching the given predicate, or null if no such element was found.
   * @param predicate - checks if array element matches some condition.
   */
  find_(predicate: (element: T) => boolean): T | null;
  /**
   * Returns the last element matching the given predicate, or null if no such element was found.
   * @param predicate - checks if array element matches some condition.
   */
  findLast(predicate: (element: T) => boolean): T | null;
  /**
   * Returns an array of all elements from all arrays in this array.
   * If there are non-array elements in source array, they will be included in result without changes.
   */
  flatten(): unknown[];
  /**
   * Accumulates value starting with initial value and applying operation from left to right to current accumulator value and each element.
   * Returns the specified initial value if the sequence is empty.
   * @param initial - start point for accumulator
   * @param operation - takes current accumulator and array element and somehow changes accumulator
   */
  fold<R>(initial: R, operation: (acc: R, element: T) => R): R;
  /**
   * Returns an array element with max key returned by selector function
   * @param selector - takes array element as argument and forms corresponding key
   */
  maxBy<R>(selector: (element: T) => R): T;
  /**
   * Returns an array element with min key returned by selector function
   * @param selector - takes array element as argument and forms corresponding key
   */
  minBy<R>(selector: (element: T) => R): T;
  /**
   * Returns sum of all numbers returned by selector.
   * @param selector - takes array element as argument and returns number
   */
  count(selector: (element: T) => number): number;
  /**
   * Groups elements of the original array by the key returned by the given keySelector function applied to each element and returns a map where each group key is associated with an array of corresponding elements.
   * The returned map preserves the entry iteration order of the keys produced from the original array.
   * @param keySelector - takes array element as argument and forms map key
   */
  groupBy1<K>(keySelector: (value: T) => K): Map<K, Array<T>>;
  /**
   * Groups values returned by the valueTransform function applied to each element of the original array by the key returned by the given keySelector function applied to the element and returns a map where each group key is associated with an array of corresponding values.
   * @param keySelector - takes array element as argument and forms map key
   * @param valueTransform - takes array element as argument and forms map value
   */
  groupBy2<K, V>(
    keySelector: (value: T) => K,
    valueTransform: (value: T) => V
  ): Map<K, Array<T>>;
}

Array.prototype.all = function <T>(predicate: (value: T) => boolean): boolean {
  for (let i = 0; i < this.length; i++) {
    if (!predicate(this[i])) {
      return false;
    }
  }
  return true;
};

Array.prototype.any = function <T>(predicate: (value: T) => boolean): boolean {
  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i])) {
      return true;
    }
  }
  return false;
};

Array.prototype.associateBy = function <T, K, V>(
  keySelector: (value: T) => K,
  valueTransform: (value: T) => V
): Map<K, V> {
  const map = new Map<K, V>();
  for (let i = 0; i < this.length; i++) {
    map.set(keySelector(this[i]), valueTransform(this[i]));
  }
  return map;
};

Array.prototype.average = function (): number | undefined {
  const values = this.filter((value) => typeof value === "number");
  if (values.length === 0) return undefined;
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
  }
  return sum / values.length;
};

function MakeObjectCopy<T>(toCopy: T): T {
  function CopyObjectRecursion(toCopy: any): any {
    let v: any;
    let copy: any = Array.isArray(toCopy) ? [] : {};
    for (const k in toCopy) {
      v = toCopy[k];
      if (typeof toCopy[k] === "object") copy[k] = CopyObjectRecursion(v);
      else copy[k] = v;
    }
    return copy;
  }
  if (typeof toCopy != "object") return toCopy;
  return CopyObjectRecursion(toCopy) as T;
}

Array.prototype.chunked = function <T, R>(
  size: number,
  transform: (array: T[]) => R
): R[] {
  const chunked: R[] = [];
  size = Math.floor(size);
  const array: T[] = [];
  for (let i = 0; i < this.length; i++) {
    array.push(this[i]);
    if (array.length === size) {
      chunked.push(transform(MakeObjectCopy(array)));
      array.length = 0;
    }
  }
  if (array.length > 0) chunked.push(transform(MakeObjectCopy(array)));
  return chunked;
};

Array.prototype.distinctBy = function <T, K>(selector: (value: T) => K): T[] {
  //const arrayCopy = MakeArrayCopy<T>(this);
  const selected: K[] = [];
  const distinct: T[] = [];
  let elementToSelect: T;
  for (let i = 0; i < this.length; i++) {
    elementToSelect = MakeObjectCopy<T>(this[i]);
    selected.push(selector(elementToSelect));
  }
  const uniqueSelected: K[] = [];
  for (let i = 0; i < selected.length; i++) {
    if (uniqueSelected.includes(selected[i])) continue; //here will be a problem if K extends object))
    uniqueSelected.push(selected[i]);
    distinct.push(this[i]);
  }
  return distinct;
};

Array.prototype.filterNot = function <T>(
  predicate: (value: T) => boolean
): T[] {
  const filtered: T[] = [];
  let elementToFilter: T;
  for (let i = 0; i < this.length; i++) {
    elementToFilter = MakeObjectCopy<T>(this[i]);
    if (!predicate(elementToFilter)) filtered.push(MakeObjectCopy<T>(this[i]));
  }
  return filtered;
};

Array.prototype.filter_ = function <T>(filter: (element: T) => boolean): T[] {
  const filtered: T[] = [];
  let elementToFilter: T;
  for (let i = 0; i < this.length; i++) {
    elementToFilter = MakeObjectCopy<T>(this[i]);
    if (filter(elementToFilter)) filtered.push(MakeObjectCopy<T>(this[i]));
  }
  return filtered;
};

Array.prototype.filterIndexed = function <T>(
  filter: (element: T, index: number) => boolean
): T[] {
  const filtered: T[] = [];
  let elementToFilter: T;
  for (let i = 0; i < this.length; i++) {
    elementToFilter = MakeObjectCopy<T>(this[i]);
    if (filter(elementToFilter, i)) filtered.push(MakeObjectCopy<T>(this[i]));
  }
  return filtered;
};

Array.prototype.find_ = function <T>(
  predicate: (element: T) => boolean
): T | null {
  let elementToFind: T;
  for (let i = 0; i < this.length; i++) {
    elementToFind = MakeObjectCopy<T>(this[i]);
    if (predicate(elementToFind)) return MakeObjectCopy<T>(this[i]);
  }
  return null;
};

Array.prototype.findLast = function <T>(
  predicate: (element: T) => boolean
): T | null {
  let last: T | null = null;
  let elementToFind: T;
  for (let i = 0; i < this.length; i++) {
    elementToFind = MakeObjectCopy<T>(this[i]);
    if (predicate(elementToFind)) last = MakeObjectCopy<T>(this[i]);
  }
  return last;
};

Array.prototype.flatten = function (): unknown[] {
  const flatten: unknown[] = [];
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      this[i].forEach((element: unknown) =>
        flatten.push(MakeObjectCopy<unknown>(element))
      );
    } else flatten.push(MakeObjectCopy<unknown>(this[i]));
  }
  return flatten;
};

Array.prototype.fold = function <T, R>(
  initial: R,
  operation: (acc: R, element: T) => R
): R {
  let acc: R = initial;
  for (let i = 0; i < this.length; i++) {
    acc = operation(acc, MakeObjectCopy<T>(this[i]));
  }
  return acc;
};

Array.prototype.count = function <T>(selector: (element: T) => number): number {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += selector(MakeObjectCopy<T>(this[i]));
  }
  return sum;
};

Array.prototype.maxBy = function <T, R>(selector: (element: T) => R): T | null {
  if (array.length === 0) return null;
  let max: T;
  const selected: R[] = [];
  for (let i = 0; i < this.length; i++) {
    selected.push(selector(MakeObjectCopy<T>(this[i])));
  }
  let maxSelected: R = selected[0];
  max = this[0];
  for (let i = 0; i < selected.length; i++) {
    if (maxSelected < selected[i]) {
      maxSelected = selected[i];
      max = this[i];
    }
  }
  return MakeObjectCopy(max);
};

Array.prototype.minBy = function <T, R>(selector: (element: T) => R): T | null {
  if (array.length === 0) return null;
  let min: T;
  const selected: R[] = [];
  for (let i = 0; i < this.length; i++) {
    selected.push(selector(MakeObjectCopy<T>(this[i])));
  }
  let minSelected: R = selected[0];
  min = this[0];
  for (let i = 0; i < selected.length; i++) {
    if (minSelected > selected[i]) {
      minSelected = selected[i];
      min = this[i];
    }
  }
  return MakeObjectCopy(min);
};

Array.prototype.groupBy1 = function <T, K>(
  keySelector: (value: T) => K
): Map<K, Array<T>> {
  const grouped = new Map<K, Array<T>>();
  let key: K;
  let correspondingValue: T[] = [];
  for (let i = 0; i < this.length; i++) {
    key = keySelector(MakeObjectCopy<T>(this[i]));
    if (!grouped.get(key)) correspondingValue = [];
    else correspondingValue = grouped.get(key) as T[];
    correspondingValue.push(MakeObjectCopy<T>(this[i]));
    grouped.set(key, correspondingValue);
  }
  return grouped;
};

Array.prototype.groupBy2 = function <T, K, V>(
  keySelector: (value: T) => K,
  valueTransform: (value: T) => V
): Map<K, Array<V>> {
  const grouped = new Map<K, Array<V>>();
  let key: K;
  let correspondingValue: V[] = [];
  let newValue: V;
  for (let i = 0; i < this.length; i++) {
    key = keySelector(MakeObjectCopy<T>(this[i]));
    if (!grouped.get(key)) correspondingValue = [];
    else correspondingValue = grouped.get(key) as V[];
    newValue = valueTransform(MakeObjectCopy<T>(this[i]));
    correspondingValue.push(newValue);
    grouped.set(key, correspondingValue);
  }
  return grouped;
};

const hello = [
  { name: "Adam", age: 44 },
  { name: "Andro", age: 44 },
  { name: "Dmytro", age: 46 },
];
console.log(
  hello.groupBy2<number, string>(
    (value) => {
      return value.age;
    },
    (element) => {
      return element.name;
    }
  )
);
const objects = [{ name: "ddfs" }, { name: "hey" }, { name: "hfdfgs" }];
console.log(
  objects.distinctBy<{ name: string }>((value) => {
    return {
      name: value.name[0],
    };
  })
);
const array: number[] = [1, 2, 3, 4, 5];
console.log(array.groupBy1<number>((element) => element % 2));
console.log(array.minBy<string>((element) => element.toString()));
console.log(array.flatten());
console.log(array.findLast((element) => element % 2 === 0));
const array3 = [1, 1, 1, 1, 3, 4];
console.log(
  array3.fold<number>(0, (acc, element) => {
    acc += element;
    return acc;
  })
);
console.log(array3.distinctBy<number>((value) => value % 2));
const array1: string[] = ["fdfdsf"];
console.log(array.average());
console.log(array1.average());
console.log(
  array.chunked<string>(3, (array) => {
    return array.join("");
  })
);

const map = array.associateBy<number, number>(
  (element) => {
    return element / 2;
  },
  (element) => {
    return element * 4;
  }
);
console.log(map);
