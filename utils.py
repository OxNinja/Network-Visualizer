import json
import re
import xmltodict


# Parsers

class NmapXmlParser:

    def __init__(self):

        self.re_nmap_host = re.compile(".*(<host .*>)")
        self.re_nmap_ports = re.compile(".*(<ports>)")

        self.re_nmap_cmd = re.compile("<nmaprun.+args=\"(.+)\" start=")
        self.re_nmap_host_ip = re.compile("<address.+addr=\"(.+)\" ")
        self.re_nmap_port_protocol = re.compile("<port.+protocol=\"(.+)\" ")
        self.re_nmap_port_id = re.compile("<port.+portid=\"(.+)\"")
        self.re_nmap_port_state = re.compile("<state.+state=\"(.+)\" reason=")
        self.re_nmap_service_name = re.compile("<service.+name=\"(.+)\" product=")
        self.re_nmap_service_product = re.compile("<service.+product=\"(.+)\" version=")

        self.re_nmap_end = re.compile(".*(</nmaprun>)")
        self.re_nmap_host_end = re.compile(".*(</host>)")
        self.re_nmap_ports_end = re.compile(".*(</ports>)")
        self.re_nmap_port_end = re.compile(".*(</port>)")
        self.re_nmap_service_end = re.compile(".*(</service>)")

    def basicParse(self, inputFile, outputFile):

        regexes = [
            # Capturing start tags
            self.re_nmap_host,
            self.re_nmap_ports,
            # Capturing data tags
            self.re_nmap_cmd,
            self.re_nmap_host_ip,
            self.re_nmap_port_protocol,
            self.re_nmap_port_id,
            self.re_nmap_port_state,
            self.re_nmap_service_name,
            self.re_nmap_service_product,
            # Capturing end tags
            self.re_nmap_end,
            self.re_nmap_host_end,
            self.re_nmap_ports_end,
            self.re_nmap_port_end,
            self.re_nmap_service_end
        ]

        data = []

        try:
            with open(inputFile, "r") as iFile:
                d = iFile.read().split("\n")

                for x in d:
                    for r in regexes:
                        m = re.search(r, x)
                        
                        if m:
                            data.append(x)
                            break

            with open(outputFile, "a") as oFile:
                for x in data:
                    oFile.write(x)

        except Exception as e:
            print(e)


# Converters

class XmlJsonConverter:

    def xml2json(self, inputFile, outputFile):
        
        try:
            with open(inputFile, "r") as iFile:
                d = iFile.read()

            dict_ = xmltodict.parse(d)
            json_ = json.dumps(dict_)

            with open(outputFile, "w") as oFile:
                oFile.write(json_)

        except Exception as e:
            print(e)


