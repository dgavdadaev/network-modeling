all: ping.dat ping.png stats

ping.dat:
	sudo python lab_netem_i.py
	sudo chown mininet:mininet ping.dat

ping.png: ping.dat
	./ping_plot

stats: ping.dat
	python3 ping_stats.py
clean:
	-rm -f *.dat *.png
