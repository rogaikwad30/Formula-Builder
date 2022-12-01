### Run Python scripts as a service example (ryrobes.com)
### Usage : python aservice.py install (or / then start, stop, remove)

import win32service
import win32serviceutil
import win32api
import win32con
import win32event
import win32evtlogutil
import os, sys, string, time

SERVICE_NAME = "Itanta Copy Document Service"

class aservice(win32serviceutil.ServiceFramework):   
    _svc_name_ = "itanta_Copy Document_Calculator"
    _svc_display_name_ = "Itanta Copy Document Calculator Service"
    _svc_description_ = "Copyright to Itanta Analytics"
         
    def __init__(self, args):
            win32serviceutil.ServiceFramework.__init__(self, args)
            self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)          

    def SvcStop(self):
            self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
            win32event.SetEvent(self.hWaitStop)                    
            
    def SvcDoRun(self):
        import servicemanager      
        servicemanager.LogMsg(servicemanager.EVENTLOG_INFORMATION_TYPE,servicemanager.PYS_SERVICE_STARTED,(self._svc_name_, ''))     
        self.timeout = 20000     #20 seconds
        # This is how long the service will wait to run / refresh itself (see script below)

        while 1:
            # Wait for service stop signal, if I timeout, loop again
            rc = win32event.WaitForSingleObject(self.hWaitStop, self.timeout)
            # Check to see if self.hWaitStop happened
            if rc == win32event.WAIT_OBJECT_0:
                # Stop signal encountered
                servicemanager.LogInfoMsg(f"{SERVICE_NAME} - STOPPED!")  #For Event Log
                break
            else:
                    #Ok, here's the real money shot right here.
                    #[actual service code between rests]
                    try:
                        servicemanager.LogInfoMsg(f"{SERVICE_NAME} - Executing")  #For Event Log
                        os.chdir(os.path.dirname(os.path.realpath(__file__)))
                        src_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "calculate.py")
                        os.system(f'python.exe \"{src_path}\"')             #Execute the script
                        servicemanager.LogInfoMsg(f"{SERVICE_NAME} - Execution Completed")  #For Event Log
                    except Exception as e:
                        servicemanager.LogInfoMsg(f"{SERVICE_NAME} - Error : {e}")  #For Event Log
                        pass
                    #[actual service code between rests]

def ctrlHandler(ctrlType):
   return True
                 
if __name__ == '__main__':  
   win32api.SetConsoleCtrlHandler(ctrlHandler, True)  
   win32serviceutil.HandleCommandLine(aservice)

# Done!