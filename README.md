[![Action Status](https://github.com/web-atoms/date-time/workflows/Build/badge.svg)](https://github.com/web-atoms/unit-test/actions) [![npm version](https://badge.fury.io/js/%40web-atoms%2Fdate-time.svg)](https://badge.fury.io/js/%40web-atoms%2Fdate-time)

# @web-atoms/date-time
Immutable DateTime library for Web Atoms in JavaScript similar to .Net DateTime and TimeSpan

# Features
1. Immutable DateTime
2. Support for TimeSpan (differences between dates)
3. Simple Add/Difference
4. Support for properties
5. Support for Comparison
6. Support for `valueOf` which makes it easier to compare and sort dates
7. Backward compatibility with JavaScript's Date

# Compatibility
In order to make usage simple, you can pass DateTime to any method that uses `Date` and everything will still work. To prevent intellisense from listing all Date's methods, we have used a hack to create new Date object in constructor of DateTime.

For easy access, all `to*String` methods of `Date` are available in intellisense.

```typescript
   const d = DateTime.now();
   console.log(d instance of Date); // prints true..

   // however intellisense does not
   // show up for Date methods except for toLocaleDateString etc
   d.year
```

# Usage

## Properties
Year, Month, Day, Hour, Minute, Second and Millisecond are all properties.

```typescript
   const d = DateTime.now();

   console.log(`${d.year}-${d.month}-${d.day}`);
```

## Trim Time
```typescript
   const d = DateTime.now();

   // returns new instance of DateTime
   // with time part trimmed...
   const day = d.date;
```

## Comparison
```typescript
   const d1 = new DateTime(2010, 1, 1, 20, 50);
   const d2 = new DateTime(2010, 2, 1, 20, 50);
   const dt1 = new Date(d1.msSinceEpoch);
   const dt2 = new Date(d1.msSinceEpoch);
   // DateTime comparison works correctly
   Assert.isTrue(d1 < d2);
   // Date comparison does not work as expected
   Assert.isFalse(dt1 < dt2);
```

## TimeSpan
```typescript
   const d = DateTime.now();

   const t = d.time;

   console.log(t); // prints 10.00 PM (local time)
```

## Difference in TimeSpan
```typescript

   const d1 = new DateTime(2010, 1, 1);
   const d2 = new DateTime(2012, 1, 1);

   // returns TimeSpan
   const diff = d2.diff(d1);

   // prints 730
   console.log(diff.totalDays);

```

## Add TimeSpan
```typescript
   
   const t = TimeSpan.fromDays(2);
   const d1 = new DateTime(2010, 1, 1);

   const d2 = d1.add(t);

   // prints 2010-01-03
   console.log(d2); 

```
