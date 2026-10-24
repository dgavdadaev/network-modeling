all: ping.png stats

ping_100.dat: lab_netem_i.py
	sudo python lab_netem_i.py
	sudo chown mininet:mininet ping_100.dat ping_50.dat

ping.png: ping_100.dat
	./ping_plot

stats: ping_100.dat
	python3 ping_stats.py

clean:
	-rm -f *.dat *.png
