#!/usr/bin/env python

"""
This example shows how to create an empty Mininet object
(without a topology object) and add nodes to it manually.
"""
import time
from mininet.net import Mininet
from mininet.node import Controller
from mininet.cli import CLI
from mininet.log import setLogLevel, info

from mininet.link import TCLink
def emptyNet():

    "Create an empty network and add nodes to it."

    net = Mininet(
    controller=Controller,
    waitConnected=True,
    link=TCLink
    )

    info( '*** Adding controller\n' )
    net.addController( 'c0' )

    info( '*** Adding hosts\n' )
    h1 = net.addHost( 'h1', ip='10.0.0.1')
    h2 = net.addHost( 'h2', ip='10.0.0.2')

    info( '*** Adding switch\n' )
    s3 = net.addSwitch( 's3' )

    info( '*** Creating links\n' )
    net.addLink(h1, s3, bw=100, delay='75ms', loss=0, use_htb=False)
    net.addLink(h2, s3, bw=100, delay='75ms', loss=0, use_htb=False)

    info( '*** Starting network\n')
    net.start()

    print("Host", h1.name, "has IP address", h1.IP(), "and MAC address", h1.MAC())
    print("Host", h2.name, "has IP address", h2.IP(), "and MAC address", h2.MAC())

    info('*** Traffic generation\n')
    h2.cmdPrint('iperf3 -s -D -1')
    time.sleep(10)
    h1.cmdPrint('iperf3 -c', h2.IP(), '-J > iperf_result.json')

    # info('*** Running CLI\n')
    # CLI(net)

    info( '*** Stopping network' )
    net.stop()


if __name__ == '__main__':
    setLogLevel( 'info' )
    emptyNet()
