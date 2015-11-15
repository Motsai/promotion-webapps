import re
import binascii

#filename = "Sitting_Standing_Sitting2_2Hz.log"
filename = "SittingStanding_Notifications3.log"

f = open(filename, 'r')

data = f.readlines()
f.close()

outfile = open(filename+'.bin', 'wb')

pattern = '.*Value: \[(.*)\]'

for line in data:
    match = re.match(pattern, line)
    if( match != None):
        data = match.groups(0)
        byteStrArr = data[0].split(':')
        if(len(byteStrArr) == 20):
            # StrBytes is a string representation of the bytes
            StrBytes = ''.join(byteStrArr)
            print StrBytes

            # BinData is the binary format
            BinData = binascii.unhexlify(StrBytes)
            outfile.write(BinData)


outfile.close()


