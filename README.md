# Cache

Create a cache in memory like redis or memcached

# Constraints

The solution has achieve this

- Define a class **"CacheInMemory"**

- Expose the methods basic in a cache 
    1. **get**: Retrieve the value via key
    2. **set**: Store the value with key, allows to add an expiration in ms (optional)
    3. **del**: Delete any key
    4. **clear**: Clear all keys
    5. **keys**: List all keys in the store

# Questions

1. How to handle if has the same key?

    Apply the same logic when you work with hashmap collisions, override or apply a list

2. Being in memory, how could you improve performance in terms of space?

    Use compresion to store the data

3. If I want to apply this same solution in a distributed system, how should I modify it?

    - Apply consistent hashing to spread the load between servers

    - Vector clock

## CAP (Consistency, Availability, Partition Tolerace)

- Consistency: Every read receives the most recent write or an error.
- Availability: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
- Partition tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

<img style="width: 600px" src="https://github.com/mtorre4580/cache-in-memory/blob/main/cap.png" alt="cap theorem" />
