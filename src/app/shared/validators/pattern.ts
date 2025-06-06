export class validationsPatterns {
  public static password =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$';
  public static onlyText = '[a-zA-Z]*';
  public static username = '^[a-zA-Z ]*$';
  public static email = '^[a-zA-Z0-9.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,100}$';
  public static updateEmail =
    '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,9}))$/';
}
