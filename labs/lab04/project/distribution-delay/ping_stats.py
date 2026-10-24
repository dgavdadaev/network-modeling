#!/usr/bin/env python3

import statistics

with open('ping.dat', 'r') as file:
    rtt = [float(line.split()[1]) for line in file if line.strip()]

print("Number of measurements:", len(rtt))
print("Minimum RTT: {:.3f} ms".format(min(rtt)))
print("Average RTT: {:.3f} ms".format(statistics.mean(rtt)))
print("Maximum RTT: {:.3f} ms".format(max(rtt)))
print("Standard deviation: {:.3f} ms".format(statistics.pstdev(rtt)))
