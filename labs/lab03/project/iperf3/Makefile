
.PHONY: all plot clean

all: iperf_result.json plot

iperf_result.json: lab_iperf3.py
	sudo python3 lab_iperf3.py

plot: iperf_result.json
	plot_iperf.sh iperf_result.json

clean:
	rm -f iperf_result.json *.csv
	rm -rf results
